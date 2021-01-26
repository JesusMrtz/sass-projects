const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');


const JAVASCRIPT_RULES = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-optional-chaining']
        }
    }
};

const CSS_RULES = {
    test: /\.(sa|sc|c)ss$/,
    use: ['style-loader',
        {
            loader: 'css-loader',
            options: {
                url: true,
                import: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            "autoprefixer",
                            {
                                autoprefixer: {
                                    browser: ["last 2 versions"]
                                },
                            }
                        ]
                    ]
                }
            }
        },
        'sass-loader',
    ],
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.[contenthash].js'
    },
    module: {
        rules: [JAVASCRIPT_RULES, CSS_RULES]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Sass desde cero",
            template: './src/index.html',
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
        }),
        new MiniCSSExtractPlugin({
            filename: "./css/styles.css",
        }),
    ]
};