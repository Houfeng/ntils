const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package.json');

module.exports = function (webpackConf, webpack) {
  webpackConf.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin()
  );
};