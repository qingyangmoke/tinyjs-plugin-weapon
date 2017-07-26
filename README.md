# tinyjs-plugin-weapon

> 武器插件

## 查看demo

`demo/index.html`

## P2
> P2 物理引擎

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

## API文档
  待完善

## demo
 ./demo

