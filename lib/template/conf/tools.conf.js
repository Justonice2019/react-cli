module.exports = {
  compile: {
    entry: './src/main.js', // 入口js
    template: './public/index.ejs', // 入口模板
    api: '/api', // 接口模拟
    proxyHost: false, // http://localhost:10000 // 代理主机(示例: 请求/api/string 会响应 http://localhost:10000/api/string 的内容)
  },
  dev: {
    host: 'localhost', // 启动服务器域名
    port: 3000, // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    historyApiFallback: true, //  解决前端路由刷新404问题, 让所有路由都加载的index.html, 否则http://localhost:3000/home 不会读取index.html
  }
};
