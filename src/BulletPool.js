/**
* 子弹
* @class BulletPool
* @constructor
* @memberof Tiny.Weapon
*/
class BulletPool {
  /**
  * @constructor
  * @param {Tiny.Weapon.Bullet} bullet 子弹实例
  */
  constructor(bullet) {
    this._bulletCreator = bullet;
    this._pool = [];
  }

  /**
  * 缓存池是否为空
  * @method Tiny.Weapon.BulletPool#isEmpty
  */
  isEmpty() {
    return this.size === 0;
  }

  /**
  * 从缓存池中取出一个子弹
  * @method Tiny.Weapon.BulletPool#getOne
  */
  getOne() {
    if (this.isEmpty) {
      return this._bulletCreator.clone();
    }
    return this._pool.shift();
  }

  /**
  * 往缓存池中放入一个子弹
  * @method Tiny.Weapon.BulletPool#pushOne
  * @param {Tiny.Weapon.Bullet} bullet 子弹对象
  */
  pushOne(bullet) {
    this._pool.push(bullet);
  }

  /**
  * @name Tiny.Weapon.BulletPool#size
  * @property {number} size - 当前缓存池的大小
  */
  get size() {
    return this._pool.length;
  }
}

export default BulletPool;
