const path = require('path');
const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  // config.module.rules.push({
  //   test: /\.(gif|jpe?g|png|svg)$/,
  //   use: {
  //     loader: 'url-loader',
  //     options: { name: '[name].[ext]' }
  //   }
  // });
  config.resolve.alias = {
    'react-native$': 'react-native-web',
    'react-native-svg': 'react-native-svg/lib/module/ReactNativeSVG.web'
  };

  config.module.rules.push({
    test: /\.ts|\.tsx$/,
    loader: ['babel-loader', 'ts-loader'],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  // config.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx'];

  return config;
};
