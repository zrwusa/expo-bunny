const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(    {
        ...env,
        // Passing true will enable the default Workbox + Expo SW configuration.
        offline: true,
    }, argv);
    config.resolve.alias['react-native-maps'] = 'react-native-web-maps';

    // Use the React refresh plugin in development mode
    if (env.mode === "development") {
        config.plugins.push(
            new ReactRefreshPlugin()
        );
    }

    return config;
};
