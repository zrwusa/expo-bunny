const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ReactRefreshPlugin =require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.plugins.push( new ReactRefreshPlugin());
  config.resolve.alias['react-native-maps']='react-native-web-maps';
  // config.resolve.alias['react-native']='react-native-web';
  return config;
};
