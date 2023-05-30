const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    target: 'node',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist/',
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
    }
}