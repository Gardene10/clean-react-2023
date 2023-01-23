const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    node: 'development',
    entry: './src/main/index.tsx',
    oninput: {
        path:path.join(__dirname, 'public/js'),
        publicPath:'/public/js',
        filename: 'budle.js'
    },
    resolve: {
        extensions: ['.ts','.tsx','.js'],
        alias: {
            '@': path.join(__dirname,'src')
        },
        devServer: {
            contentBase: './public',
            writeToDisk: true,
            historyApiFallBack: true
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM'
        },
        plugins: [
            new CleanWebpackPlugin()
        ]
    }
}