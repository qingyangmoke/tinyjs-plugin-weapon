# tinyjs-plugin-weapon

> 武器发射系统插件

## 查看demo

http://tinyjs.net/#/plugins/tinyjs-plugin-weapon/demo

## 引用方法

- 推荐作为依赖使用

  - `npm install tinyjs-plugin-weapon --save`

- 也可以直接引用线上cdn地址，注意要使用最新的版本号，例如：

  - https://gw.alipayobjects.com/as/g/tiny-plugins/tinyjs-plugin-weapon/0.1.1/index.js
  - https://gw.alipayobjects.com/as/g/tiny-plugins/tinyjs-plugin-weapon/0.1.1/index.debug.js
## 起步
首先当然是要引入，推荐`NPM`方式，当然你也可以下载独立版本，先从几个例子入手吧！

##### 1、最简单的例子

引用 Tiny.js 源码
``` html
<script src="https://gw.alipayobjects.com/as/g/tiny/tiny/1.1.5/tiny.js"></script>
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

## 依赖
- `Tiny.js`: [Link](http://tinyjs.net/#/docs/api)

## 相关文档
- [Tiny.js](http://tinyjs.net/#/docs/api)
- [Tiny.Physics.Ant.js](https://github.com/qingyangmoke/tinyjs-plugin-ant)
- [Tiny.Physics.P2.js](https://github.com/qingyangmoke/tinyjs-plugin-p2)

## 特别声明
代码中部分算法 借鉴了 [Phaser](http://phaser.io/) 的实现

## API文档

http://tinyjs.net/#/plugins/tinyjs-plugin-weapon/docs

