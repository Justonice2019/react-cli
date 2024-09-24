const fs = require('fs');
const path = require('path');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const reload = require('./reload');
const filenames = fs.readdirSync(__dirname)
  .map(filename => filename.split('.')[0])
  .filter(filename =>
    filename !== 'index' &&
        filename !== 'reload'
  );

module.exports = (middlewares, devServer, compileConfig) => {
  const app = devServer.app;
  app.use(express.text());
  app.use(express.raw());
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // 1.代理远程服务器(写在上面的优先级较高, 会覆盖模拟接口)
  if(compileConfig.proxyHost)
    app.use('^/api', createProxyMiddleware({
      target: compileConfig.proxyHost,
      changeOrigin: true
    }));


  // 2. 接口模拟
  filenames.forEach(filename => {
    app.use(`/api/${filename}`, reload(path.join(__dirname, `./${filename}.js`)));
  });
  return middlewares;
};
