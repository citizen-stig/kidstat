var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../static/js');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    entry: APP_DIR + '/app.js',
    externals: {
        "reflux": "Reflux"
        // "react-bootstrap": "ReactBootstrap"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.jsx?/, include: APP_DIR, loader: 'babel?cacheDirectory'}
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'kidstat.js'
    }
};

module.exports = config;