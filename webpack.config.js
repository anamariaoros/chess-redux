const path = require( "path" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ExtractTextPlugin( "css/styles.css" ),
];

module.exports = {
    context: path.resolve( __dirname, "src" ),
    entry: "./js/app.js",
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    watch: true,
    output: {
        path: path.resolve( __dirname, "public" ),
        filename: "js/[name].bundle.js",
    },

    devServer: {
        contentBase: "public",
    },
    module: {
        rules: [
            {
                test: /.*\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: "css-loader?url=false",
                } ),
            },
        ],
    },
    plugins,
};
