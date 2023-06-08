const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['', '.tsx', '.ts', '.js', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: true,
        })
    ]
}