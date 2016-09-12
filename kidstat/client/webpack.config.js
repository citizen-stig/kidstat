var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../static/js');
var APP_DIR = path.resolve(__dirname, 'src/');
var PROD = (process.env.NODE_ENV === 'production');

var plugins;
if (PROD) {
    plugins = [new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })]
} else {
    plugins = [];
}

var config = {
    entry: APP_DIR + '/app.js',
    externals: {
        "reflux": "Reflux"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.jsx?/, include: APP_DIR, loader: 'babel'}
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: PROD ? 'kidstat.min.js' : 'kidstat.js'
    },
    plugins: plugins
};

module.exports = config;