/* eslint-disable @typescript-eslint/no-var-requires */
const {withExpo} = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withTM = require('next-transpile-modules')([
    'expo-next-react-navigation',
    // you can add other modules that need traspiling here
])

const isDev = process.env.NODE_ENV === "development";
let withArray = [withTM, withFonts, withImages, [withExpo, {projectRoot: __dirname}]];

if(!isDev){
    withArray.push(withOffline);
}

const nextConfigOffline = isDev ? {} : {
    target: 'serverless',
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
    // turn on the SW in dev mode so that we can actually test it
    generateInDevMode: true,
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'https-calls',
                    networkTimeoutSeconds: 15,
                    expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    }
}
module.exports = withPlugins(
    withArray,
    {
        ...nextConfigOffline,
        async rewrites() {
            return [
                // Rewrite everything else to use `pages/index`
                {
                    source: '/:path*',
                    destination: '/',
                },
            ];
        },
        webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
            // Note: we provide webpack above so you should not `require` it
            // Perform customizations to webpack config
            config.resolve.alias['react-native-maps'] = 'react-native-web-maps';

            // Important: return the modified config
            return config
        },
    }
)
