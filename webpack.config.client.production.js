const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    mode: 'production',
    entry: [path.join(CURRENT_WORKING_DIR, 'client/main.js')],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            { /**talvez esse não seja necessário */
                test: /\.(png|jpe?g|webp|git|svg|)$/i,
                use: [
                    {
                      loader: 'img-optimize-loader',
                    },
                  ]
            }
        ]
    }
}

module.exports = config