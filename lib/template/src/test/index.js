/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// import 'core-js' // 手动完整引入,只会在window.xxx 这个xxx没有的时候调用core-js的垫片
// import "core-js/es/promise"; // 手动按需加载, 只会在window.Promise 没有的时候调用 core-js Promise

import './css/index.css';
import './less/index.less';
import './scss/index.scss';
// import './styl/index.styl'


import notFound from './svg/404.svg';


import notFoundTxt from './txt/404.txt';


import data from './json/data.json';
import logo from './img/logo.gif';


import './css/iconfont.css';

// css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。
import count from './js/count';
import sum from './js/sum';


import {add} from './js/math';


const body = document.body;
const test = document.createElement('div');
test.innerHTML = `
  <div class="box-css"></div>
  <div class="box-less"></div>
  <div class="box-scss"></div>
  <div class="box-styl"></div>
  <div class="box-bg"></div>
  <div id="block"></div>
  <div id="block2"></div>
  <div id="dataEl"></div>
  <img id="img">
  <div>
    <span class="iconfont icon-aixin"></span>
    <span class="iconfont icon-bianji"></span>
    <span class="iconfont icon-Dyanjing"></span>
    <span class="iconfont icon-caidan"></span>
  </div>
  <button id="async-load-js">异步加载js</button>
  <button id="async-load-css">异步加载css</button> <br>
  <button id="async-load-customTools">异步加载customTools</button>
  <button id="async-load-a">异步加载a</button>
  <button id="async-load-b">异步加载b</button>
`;
body.appendChild(test);
block.style.background = `url(${notFound}) no-repeat`;
block.style.backgroundSize = '100px 100px';
block.style.width = '100px';
block.style.height = '100px';

block2.style.background = `url(${notFoundTxt}) no-repeat`;
block2.style.backgroundSize = '100px 100px';
block2.style.width = '100px';
block2.style.height = '100px';
dataEl.textContent = JSON.stringify(data);
// const logo = new URL('./img/logo.gif', import.meta.url) // 会导致生成环境无法正确读取图片
img.width = 100;
img.height = 100;
img.src = logo;


const a = 2;


const foo = () => {};
foo();
console.dir(Promise);
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功了'), 3000);
});
promise.then(res => console.log(res));
class Person {}
const p = new Person();
console.log(p);
class Animal {}
const animal = new Animal();
console.log(animal);
const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);
// 判断是否支持HMR功能
if(module.hot) {
  module.hot.accept('./js/count.js', () => {
    const result1 = count(2, 1);
    console.log(result1);
  });
  module.hot.accept('./js/sum.js', () => {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
add(1, 2);


document.getElementById('async-load-js').onclick = function() {
  // eslint不能识别动态导入需要，需要额外追加配置
  // webpack魔法命名
  import(/* webpackChunkName: "other-js", webpackPrefetch: true */ './js/other').then(({other}) => {
    console.log(other);
  });
};
document.getElementById('async-load-css').onclick = function() {
  import(/* webpackChunkName: "other-css" */ './css/other.css').then(res => {
    console.log(res);
  });
};

// Initial同步加载
// import {getCookie, setCookie, formatTime} from './js/customTools'
// getCookie()
// setCookie()
// formatTime(1, 2)
document.getElementById('async-load-customTools').onclick = function() {
  // import(/* webpackChunkName: "customTools别名", webpackPrefetch: true */ "./js/customTools.js").then(({getCookie, setCookie, formatTime}) => {
  import(/* webpackChunkName: "customTools别名" */ './js/customTools.js').then(({getCookie, setCookie, formatTime}) => {
    getCookie();
    setCookie();
    formatTime(1, 2);
  });
};

// document.getElementById("async-load-a").onclick = function () {
//   import(/* webpackChunkName: "a" */ "./js/a.js").then((res) => {
//     console.log(res);
//   });
// };
// document.getElementById("async-load-b").onclick = function () {
//   import(/* webpackChunkName: "b" */ "./js/b.js").then((res) => {
//     console.log(res);
//   });
// };
// document.getElementById("async-load-c").onclick = function () {
//   import(/* webpackChunkName: "c" */ "./js/c.js").then((res) => {
//     console.log(res);
//   });
// };


