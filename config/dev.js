module.exports = {
  env: {
    NODE_ENV: '"development"',
    baseUrl: '/apis',
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    publicPath: '/',
    devServer: {
      proxy: {
        '/apis': {
          target: 'http://cdelevator.labradors.work',
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
      host: '0.0.0.0'
    },
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    }
  }
}
