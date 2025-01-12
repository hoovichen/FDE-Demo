module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/FDE-Demo/' : '/',
  outputDir: 'dist',
  devServer: {
    historyApiFallback: true, // 确保在开发环境支持路由回退
  },
  transpileDependencies: [],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'FireDragon Enterprise'
        return args
      })
  }
};
