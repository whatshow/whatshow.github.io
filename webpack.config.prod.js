/**
 * 测试配置
 */
//导入第三方函数库
const path = require('path');
const webpack = require('webpack');
//增加代理服务器配置
let webpackConfig = require("./webpack.config");
//增加插件
webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),   //追加热替换插件（不加报错  [HMR] Hot Module Replacement is disabled. ）
    new webpack.HashedModuleIdsPlugin()     // 用在生产模式
);
//导出新配置
module.exports = webpackConfig;