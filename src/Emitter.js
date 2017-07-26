import Bullet from './Bullet';
import * as TinyMath from './math';
import Point from './Point';
import Rectangle from './Rectangle';
import BulletPool from './BulletPool';
import * as killTypes from './killTypes';

/**
 * 武器发射器
 * @class Emitter
 * @constructor
 * @memberof Tiny.Weapon
 * @extends Tiny.Container
 */
class Emitter extends Tiny.Container {
  /**
   * @constructor
   * @param {Tiny.Application} app
   * @param {Tiny.BaseTexture} texture
   */
  constructor(app, texture) {
    super();

    /**
     * 默认子弹缓存池的key
     */
    this.DEFAULT_KEY = 'default';

    /**
    * @name Tiny.Weapon.Emitter#app
    * @property {Tiny.Application} app - 对当前app实例引用
    */
    this.app = app;

    /**
     * @private
     * @property {number} 累计发射的子弹数
     * @default 0
     */
    this._fireCount = 0;

    /**
     * 当前系统的物理系统
     */
    this._physics = this.app.physics.ant || this.app.physics.p2;

    /**
     * @private
     * @property {object} 子弹缓存池
     */
    this._bulletsPools = {};

    /**
     * @private
     * @property {Array} 数组
     */
    this._bullets = [];

    /**
     * @name Tiny.Weapon.Emitter#trackedSprite
     * @property {Tiny.Sprite|Tiny.Image|Tiny.Text|Tiny.DisplayObjects} tiny 当前发射器装在的对象
     */
    this.trackedSprite = null;

    /**
     * @name Tiny.Weapon.Emitter#trackRotation
     * @property {Boolean} trackRotation - 武器是否根据sprite的旋转进行旋转 默认是true
     * @default true
     */
    this.trackRotation = true;

    /**
     * @name Tiny.Weapon.Emitter#trackOffset
     * @property {Boolean} trackOffset - 发射点相对于发射器装在对象的偏移
     * @default 0,0
     */
    this.trackOffset = new Point(0, 0);

    /**
     * @private
     * @property {Point} 临时存储旋转点的变量
     */
    this._rotatedPoint = new Point(0, 0);

    /**
    * @name Tiny.Weapon.Emitter#fireFrom
    * @property {Rectangle} 子弹发射点的局部区域 在这个区域里随机取值
    */
    this._fireFrom = new Rectangle(0, 0, 1, 1);

    /**
     * @name Tiny.Weapon.Emitter#bulletSpeed
     * @property {number} 子弹速度
     * @default 200
     */
    this.bulletSpeed = 200;

    /**
    * @name Tiny.Weapon.Emitter#bulletSpeedVariance
    * @property {number} 子弹速度随机变化的幅度
    * @default 0
    */
    this.bulletSpeedVariance = 0;

    /**
     * @name Tiny.Weapon.Emitter#bulletAngleOffset
     * @property {number} 子弹相对于sprite的角度偏移
     * @default 0
     */
    this.bulletAngleOffset = 0;

    /**
    * @private
    * @property {number} 子弹销毁的时机
    * @default Tiny.Weapon.killTypes.KILL_WORLD_BOUNDS
    */
    this._bulletKillType = killTypes.KILL_WORLD_BOUNDS;

    /**
    * @name Tiny.Weapon.Emitter#bulletBounds
    * @property {number} 子弹生存的边界 默认是tiny的舞台区域
    */
    this.bulletBounds = this.getWorldBounds();

    /**
    * @name Tiny.Weapon.Emitter#bulletAngleVariance
    * @property {number} 子弹发射角度的随机差异幅度 角度会在这个范围内进行随机取值 有一个随机的变化量
    * @default 0
    */
    this.bulletAngleVariance = 0;

    /**
    * @name Tiny.Weapon.Emitter#bulletGravity
    * @property {Tiny.Point} 子弹的自定义重力 在ant物理系统中有用
    * @default 0,0
    */
    this.bulletGravity = new Point(0, 0);

    /**
    * @name Tiny.Weapon.Emitter#bulletLifespan
    * @property {number} 子弹的生命周期 子弹距离从发射时间大于这个值则自动销毁  当bulletKillType 为 KILL_LIFESPAN时有效
    * @default 5000
    */
    this.bulletLifespan = 5000;

    /**
    * @name Tiny.Weapon.Emitter#bulletKillDistance
    * @property {number} 子弹的生命周期-长度 子弹距离发射点的距离大于这个值 自动销毁 当bulletKillType 为 KILL_DISTANCE时有效
    * @default 100
    */
    this.bulletKillDistance = 100;

    /**
    * @name Tiny.Weapon.Emitter#bulletRotateToVelocity
    * @property {boolean} 子弹是否根据速度进行自动旋转
    * @default false
     */
    this.bulletRotateToVelocity = false;

    /**
    * @name Tiny.Weapon.Emitter#autofire
    * @property {boolean} 是否自动发射
    * @default false
    */
    this.autofire = false;

    /**
     * @name Tiny.Weapon.Emitter#fireLimit
     * @property {number}  限制的最大发射数 超过这个数字不在发射 <=0 不限制
     * @default 0
     */
    this.fireLimit = 0;

    /**
     * @name Tiny.Weapon.Emitter#fireAngle
     * @property {number} 发射的角度
     * @default 0
     */
    this.fireAngle = 0;

    /**
     * @name Tiny.Weapon.Emitter#fireRate
     * @property {number} 发射的频率
     * @default 100
     */
    this.fireRate = 100;

    /**
     * @name Tiny.Weapon.Emitter#fireRate
     * @property {number} 发射频率的随机误差值
     * @default 0
     */
    this.fireRateVariance = 0;

    /**
    * 如果传递了纹理则注册到默认缓存池中
    */
    if (texture) {
      this.register(texture);
    }

    /**
     * 定时器 用来更新发射系统
     * @private
     */
    this._ticker = new Tiny.ticker.Ticker();
    this._ticker.add(this.update, this);
    this._ticker.start();
  }

  /**
   * 获取系统的边界
   * @method Tiny.Weapon.Emitter#getWorldBounds
   */
  getWorldBounds() {
    return new Rectangle(0, 0, this.app.renderer.width, this.app.renderer.height);
  }

  /**
   * @name Tiny.Weapon.Emitter#bulletKillType
   * @property {number} bulletKillType 子弹销毁的类型
   */
  get bulletKillType() {
    return this._bulletKillType;
  }

  set bulletKillType(type) {
    switch (type) {
      // case killTypes.KILL_STATIC_BOUNDS:
      // case killTypes.KILL_WEAPON_BOUNDS:
      //   this.bulletBounds = this.bounds;
      //   break;

      case killTypes.KILL_CAMERA_BOUNDS:
      case killTypes.KILL_WORLD_BOUNDS:
        this.bulletBounds = this.getWorldBounds();
        break;
    }

    this._bulletKillType = type;
  }

  /**
  * 注册一个武器素材
  * @method Tiny.Weapon.Emitter#register
  * @param {Tiny.BaseTexture=} texture
  * @param {String} [key='default'] - 子弹key 唯一 不可重复
  */
  register(texture, key) {
    if (key === undefined) {
      key = this.DEFAULT_KEY;
    }
    if (!(key in this._bulletsPools)) {
      this._bulletsPools[key] = new BulletPool(new Bullet(texture, this));
    }
  }

  /**
  * @name Tiny.Weapon.Emitter#timeNow
  * @property {number} timeNow 当前时间
  */
  get timeNow() {
    return Date.now();
  }

  /**
   * @name Tiny.Weapon.Emitter#fireCount
   * @property {number} fireCount 已发射的子弹总数
   */
  get fireCount() {
    return this._fireCount;
  }

  /**
   * @method Tiny.Weapon.Emitter#fire
   * @param {String} key - 子弹缓存池的key
   */
  fire(key) {
    if (this.trackedSprite == null) {
      throw Error('trackedSprite is null');
    }

    const timeNow = this.timeNow;

    if (timeNow < this._nextFire || (this.fireLimit > 0 && this.fireCount >= this.fireLimit)) {
      return false;
    }

    if (key === undefined) {
      key = this.DEFAULT_KEY;
    }

    if (!(key in this._bulletsPools)) {
      throw Error('please register first');
    }

    const bullet = this._bulletsPools[key].getOne();
    this._bullets.push(bullet);

    this._physics.enable(bullet, false);

    if (this.trackRotation) {
      this._rotatedPoint.set(this.trackedSprite.x + this.trackOffset.x, this.trackedSprite.y + this.trackOffset.y);
      this._rotatedPoint.rotate(this.trackedSprite.x, this.trackedSprite.y, this.trackedSprite.rotation);

      if (this._fireFrom.width > 1) {
        this._fireFrom.centerOn(this._rotatedPoint.x, this._rotatedPoint.y);
      } else {
        this._fireFrom.x = this._rotatedPoint.x;
        this._fireFrom.y = this._rotatedPoint.y;
      }
    } else {
      if (this._fireFrom.width > 1) {
        this._fireFrom.centerOn(this.trackedSprite.x + this.trackOffset.x, this.trackedSprite.y + this.trackOffset.y);
      } else {
        this._fireFrom.x = this.trackedSprite.x + this.trackOffset.x;
        this._fireFrom.y = this.trackedSprite.y + this.trackOffset.y;
      }
    }

    let bulletSpeed = this.bulletSpeed;

    // 子弹速度根据设定的幅度进行随意取值
    if (this.bulletSpeedVariance !== 0) {
      bulletSpeed += TinyMath.between(-this.bulletSpeedVariance, this.bulletSpeedVariance);
    }

    const fromX = (this._fireFrom.width > 1) ? this._fireFrom.randomX : this._fireFrom.x;
    const fromY = (this._fireFrom.height > 1) ? this._fireFrom.randomY : this._fireFrom.y;

    // let angle = (this.trackRotation) ? this.trackedSprite.rotation : this.fireAngle;
    let angle = this.trackedSprite.rotation + TinyMath.degToRad(this.fireAngle);

    //  根据角度变量随机调整角度 +-
    if (this.bulletAngleVariance !== 0) {
      angle += TinyMath.degToRad(TinyMath.between(-this.bulletAngleVariance, this.bulletAngleVariance));
    }

    let moveX = 0;
    let moveY = 0;

    // 特殊角度处理
    if (angle === 0 || angle === 180) {
      moveX = Math.cos(angle) * bulletSpeed;
    } else if (angle === 90 || angle === 270) {
      moveY = Math.sin(angle) * bulletSpeed;
    } else {
      moveX = Math.cos(angle) * bulletSpeed;
      moveY = Math.sin(angle) * bulletSpeed;
    }

    bullet.reset(fromX, fromY, angle + this.bulletAngleOffset);

    bullet.data.fromX = fromX;
    bullet.data.fromY = fromY;
    bullet.data.fireTime = timeNow;
    bullet.data.killType = this.bulletKillType;
    bullet.data.killDistance = this.bulletKillDistance;
    bullet.data.killLifeSpan = this.bulletLifespan;
    bullet.data.rotateToVelocity = this.bulletRotateToVelocity;

    if (bullet.body) {
      bullet.body.velocity.x = moveX;
      bullet.body.velocity.y = moveY;
      if (bullet.body.gravity) {
        bullet.body.gravity.set(this.bulletGravity.x, this.bulletGravity.y);
      }
    } else {
      throw Error('set ant physics system first');
    }

    let fireRate = this.fireRate;
    if (this.fireRateVariance !== 0) {
      fireRate += TinyMath.between(-this.fireRateVariance, this.fireRateVariance);
      if (fireRate < 0) {
        fireRate = 0;
      }
    }

    this._nextFire = timeNow + fireRate;

    this._fireCount++;

    this.dispatch('fire', bullet, this, bulletSpeed);

    if (this.fireLimit > 0 && this.fireCount === this.fireLimit) {
      this.dispatch('fireLimit', this, this.fireLimit);
    }

    if (bullet.parent !== this) {
      this.addChild(bullet);
    }

    bullet.revive();
  }

  /**
  * @private
  * @param {String} eventName
  * @param {any} args 可变参数
  */
  dispatch(eventName, ...args) {
    this.emit.apply(this, arguments);
  }

  /**
  * 武器需要作用的对象
  * @method Tiny.Weapon.Emitter#trackSprite
  * @param {Phaser.Sprite|Object} sprite - 发射器所作用于的对象
  * @param {integer} [offsetX=0] - 武器发射点相对于sprite的x偏移量
  * @param {integer} [offsetY=0] - 武器发射点相对于sprite的y偏移量
  * @param {boolean} [trackRotation=true] - 武器是否根据sprite的旋转进行旋转 默认是true
  * @return {Tiny.Weapon.Emitter} 当前发射器对象
  */
  trackSprite(sprite, offsetX = 0, offsetY = 0, trackRotation = true, fireAngle = 0) {
    this.trackedSprite = sprite;
    this.trackRotation = trackRotation;
    this.trackOffset.set(offsetX, offsetY);
    this.fireAngle = fireAngle;
    return this;
  }

  /**
  * 更新
  * @private
  */
  update() {
    // 更新子弹 并回收已销毁的子弹
    let removed = [];
    this._bullets.forEach((b, i) => {
      b.update();
      if (!b.exists) {
        removed.push(b);
      }
    });

    removed.forEach((e) => {
      const idx = this._bullets.indexOf(e);
      this._bullets.splice(idx, 1);
    });

    removed = null;

    // 自动发射
    if (this.autofire) {
      this.fire();
    }
  }

  /**
  * 销毁当前武器发射器
  * @method Tiny.Weapon.Emitter#destroy
  */
  destroy() {
    this._ticker.remove(this.update, this);
    this._ticker.stop();
    this._physics = null;
    this.app = null;
    this._bulletsPools = null;
    this._bullets = null;
  }
}

export default Emitter;
