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
    new webpack.NamedModulesPlugin()            // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
    // new webpack.HashedModuleIdsPlugin(),     // 用在生产模式
);
webpackConfig.devServer = {
    port: 8000,
    open : true,                                //配置后自动打开
    hot: true,                                  //实时刷新
    historyApiFallback: true,                   //不跳转
    contentBase: path.resolve(__dirname, '.'),  //本地服务器所加载的页面所在的目录
    disableHostCheck: true,
    stats: {
        colors: true,
        timings: true,
        chunks: false   // less verbose, disable chunk information output
    },
};
//导出新配置
module.exports = webpackConfig;