const path = require('path');
const nodeExternals = require('webpack-node-externals');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/app.ts'),
    devtool: 'inline-source-map',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, '../client/dist/api/'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: path.join(__dirname, '../client/dist/api/'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../client/dist/api/'),
        },
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
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.css'],
    },
    node: {
        __dirname: false,
    }
}
