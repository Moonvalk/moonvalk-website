const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/app.ts'),
    devtool: 'inline-source-map',
    target: 'node',
    output: {
        path: path.join(__dirname, '../client/dist/api/'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
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
