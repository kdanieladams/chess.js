const path = require('path');

module.exports = {
    entry: './src/main.js',
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
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    }
};
