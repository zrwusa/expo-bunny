/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
// const withOffline = require('next-offline')

const withTM = require('next-transpile-modules')([
    'expo-next-react-navigation',
    // you can add other modules that need traspiling here
])

module.exports = withPlugins(
    [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
    {
        async rewrites() {
            return [
                // Rewrite everything else to use `pages/index`
                {
                    source: '/:path*',
                    destination: '/',
                },
            ];
        },
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            // Note: we provide webpack above so you should not `require` it
            // Perform customizations to webpack config
            config.resolve.alias['react-native-maps'] = 'react-native-web-maps';

            // Important: return the modified config
            return config
        },
    }
)
