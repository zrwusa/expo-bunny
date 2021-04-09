const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
    const isDev = env.mode === 'development';
    const envConfig = isDev?env:{
        ...env,
        // Passing true will enable the default Workbox + Expo SW configuration.
        offline: true
    }
    const config = await createExpoWebpackConfigAsync(envConfig, argv);
    config.resolve.alias['react-native-maps'] = 'react-native-web-maps';
    config.resolve.alias['react-native-linear-gradient'] = 'react-native-web-linear-gradient';
    // config.resolve.alias['victory-native'] = 'victory';
    // config.resolve.alias['react-native-svg'] = 'svgs';

    // Use the React refresh plugin in development mode
    if (isDev) {
        config.plugins.push(
            new ReactRefreshPlugin()
        );
    }

    return config;
};
