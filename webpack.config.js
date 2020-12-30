const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ReactRefreshPlugin =require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.plugins.push( new ReactRefreshPlugin());
  return config;
};
