# tinyjs-plugin-weapon

> 武器发射系统插件

## 查看demo

`demo/index.html`

## 引用方法

- 推荐作为依赖使用

  - `npm install tinyjs-plugin-weapon --save`
  - 或者使用 ./dist/index.js 或者./dist/index.debug.js

## 起步
首先当然是要引入，推荐`NPM`方式，当然你也可以下载独立版本，先从几个例子入手吧！

##### 1、最简单的例子

引用 Tiny.js 源码
``` html
<script src="http://tinyjs.net/libs/tiny.debug.js"></script>
```

``` js
// var Weapon = Tiny.Weapon;
// var Weapon = require('tinyjs-plugin-weapon');
weaponEmitter = new Tiny.Weapon.Emitter(app, Tiny.Loader.resources['bullet'].texture);
weaponEmitter.bulletSpeed = 300;
weaponEmitter.fireRate = 300;
weaponEmitter.autofire = true;
weaponEmitter.trackSprite(sprite, 0, -sprite.height / 2, true, -90);
container.addChild(weaponEmitter);
```

## 相关文档
- [Tiny.js](http://tinyjs.net/#/docs/api)
- [Tiny.Physics.Ant.js](https://github.com/qingyangmoke/tinyjs-plugin-ant)

## 特别声明
代码中部分算法 借鉴了 [Phaser](http://phaser.io/) 的实现

## API文档
``` js
  // 项目基于jsdoc自动生成API文档
  git clone https://github.com/qingyangmoke/tinyjs-plugin-weapon.git
  cd tinyjs-plugin-weapon
  npm i
  npm run doc
```

## demo
 ./demo

