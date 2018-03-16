/**
 * 基础配置
 */
//第三方函数库
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//环境变量
const pkg = require('./package.json'); // 这个路径视当前的路径进行对于修改
//配置主题
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
        cfgPath = resolve(args.cwd, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

module.exports = {
    //生成sourcemap
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.[hash:5].js'
        filename: 'bundle.js'
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                //打包除这个文件之外的文件
                exclude: path.resolve(__dirname,"./node_modules"),
                //打包包括的文件
                //include: path.resolve(__dirname, "./src"),
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    }
};
