module.exports = {
  env: {
    NODE_ENV: '"production"',
    baseUrl: '/apis'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    publicPath: '/elevator-chengdu',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    }
  }
}
