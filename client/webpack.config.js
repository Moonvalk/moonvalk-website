const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3001;

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/dist/public'),
        filename: 'main.[hash].js',
        clean: true,
        publicPath: './',
    },
    devServer: {
        static: './dist/public',
        port: port,
        historyApiFallback: true,
        open: true,
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true,
        },
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
    optimization: {
        moduleIds: 'named',
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