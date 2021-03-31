const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const path = require("path");
const https = require("https");
const bunnyConfig = require("../src/config.js")

const server = jsonServer.create()
const router = jsonServer.router(`${__dirname}/database.json`)
const userdb = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

// Get user info
function getUser({email, password}) {
    return userdb.users.find(user => user.email === email && user.password === password)
}

// Register New User
server.post('/auth/register', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const {email, password} = req.body;

    if (isAuthenticated({email, password}) === true) {
        const status = 401;
        const message = 'Email and Password already exist';
        res.status(status).json({status, message});
        return
    }

    fs.readFile(`${__dirname}/users.json`, (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({status, message})
            return
        }

        // Get current users data
        var data = JSON.parse(data.toString());

        // Get the id of last user
        var last_item_id = data.users[data.users.length - 1].id;

        //Add new user
        data.users.push({id: last_item_id + 1, email: email, password: password}); //add some data
        var writeData = fs.writeFile(`${__dirname}/users.json`, JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({status, message})
                return
            }
        });
    });

// Create token for new user
    const access_token = createToken({email, password})
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    const {email, password} = req.body;
    if (isAuthenticated({email, password}) === false) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({status, message})
        return
    }

    const user = getUser({email, password})

    const access_token = createToken({email, password})

    const {nickname} = user;
    res.status(200).json({"access_token": access_token, "user": {email, nickname}})
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({status, message})
        return
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401
            const message = 'Access token not provided'
            res.status(status).json({status, message})
            return
        }
        next()
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({status, message})
    }
})

server.use(router)

const {port, isHttps} = bunnyConfig.mock;

const keyFile = path.resolve('.expo/web/development/ssl', 'key-localhost.pem');
const certFile = path.resolve('.expo/web/development/ssl', 'cert-localhost.pem');
let key, cert;
let isExpoSSLFileExist = true;
try {
    key = fs.readFileSync(keyFile);
    cert = fs.readFileSync(certFile);
} catch (err) {
    isExpoSSLFileExist = false;
}

if (isHttps && isExpoSSLFileExist) {
    https
        .createServer(
            {
                key: key,
                cert: cert,
            },
            server
        )
        .listen(port, () => {
            console.log(`https://localhost:${port}/ Run API Mock Server with expo SSL(Just a Self Signed SSL,only for development)`);
        });
} else {
    server.listen(port, () => {
        console.log(`http://localhost:${port}/ Run API Mock Server`)
    })
}


