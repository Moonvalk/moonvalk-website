const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.tsx',
    output: {
        path: path.join(__dirname, '/dist/public/'),
        filename: 'main.[hash].js',
        clean: true,
        publicPath: './',
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
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            minify: true,
            favicon: "./src/assets/images/favicon.png",
            alwaysWriteToDisk: true,
            publicPath: './',
            hash: true,
        })
    ]
}