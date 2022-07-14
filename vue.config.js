const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave: false,
  
  devServer: { port: 8001},   // 端口号 

  //代理服务器
    devServer: {
      proxy: {
        '/api': {
          target: 'http://gmall-h5-api.atguigu.cn',
          //路径重写的api我忘记了，还好不需要
          //pathRewrite:{'^/api':''}
          ws: true,
          changeOrigin: true
        },
      }
    }
})

// module.exports = {  devServer: {    port: 8080,   // 端口号  }}
