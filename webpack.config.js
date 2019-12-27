const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'chess.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                              "@babel/preset-env",
                              {
                                useBuiltIns: "usage",
                              },
                            ]
                        ],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    }
};
