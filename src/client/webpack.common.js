const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const basePath = path.join(__dirname, 'src')

const development = process.env.NODE_ENV !== 'production'

const title = 'Horizon'

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: [
          basePath
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
           development ? 'style-loader' : MiniCssExtractPlugin.loader,
           'css-loader',
           'sass-loader',
        ],
      },
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(basePath, 'template.html'),
      filename: path.join(__dirname, 'dist/index.html'),
      title
    }),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: development ? '[name].css' : '[name].[hash].css',
      chunkFilename: development ? '[id].css' : '[id].[hash].css',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
