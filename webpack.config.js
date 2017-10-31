var path = require( "path" ); /* eslint no-var: "off" */

module.exports = {
    context: path.resolve( "js" ),
    entry: "./app.js",
    output: {
        path: path.resolve( "build/js" ),
        publicPath: "/public/assets/js/",
        filename: "bundle.js",
    },

    devServer: {
        contentBase: "public",
    },
    watch: true,
    module: {
        loaders: [
            { test: /.*\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, exclude: /node_modules/, loaders: [ "style-loader", "css-loader" ] },
        ],
    },
};
