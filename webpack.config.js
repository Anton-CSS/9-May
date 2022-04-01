const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
}

const PREFIX = process.env.NODE_ENV === "production" ? "Diplom-OTUS" : "/";

const name = () => (mode === "development" ? `[name]` : `[name].[contenthash]`);

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: mode,
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `${name()}.js`,
        clean: true,
        assetModuleFilename: "images/[hash][ext][query]",
        publicPath: "",
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: true,
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename: `./css/${name()}.css`,
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "404.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'app')}
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg|webp)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(j|t)s$|(j|t)sx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
