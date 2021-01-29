/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
    'expo-next-react-navigation',
    // you can add other modules that need traspiling here
])

module.exports = withPlugins(
    [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
    {
        // ...
    }
)
