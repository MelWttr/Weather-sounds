const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        open: true,
    },
    plugins: [
        new ESLintPlugin(),
        new StylelintPlugin(),
    ],
});