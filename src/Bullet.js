import * as WeaponMath from './math';
import * as killTypes from './killTypes';

/**
* 子弹
* @class Bullet
* @constructor
* @memberof Tiny.Weapon
* @extends Tiny.Sprite
*/
class Bullet extends Tiny.Sprite {
  /**
  * @constructor
  * @memberof Tiny.Weapon
  * @extends Tiny.Sprite
  * @param {Tiny.BaseTexture} texture 子弹的纹理
  * @param {Tiny.Weapon.Emitter} emitter 子弹发射器实例引用
  */
  constructor(texture, emitter) {
    super(texture);

    this._baseTexture = texture;
    this.anchor.set(0.5);

    this.data = {
      emitter,
      fromX: 0,
      fromY: 0,
      fireTime: 0,
      // bodyDirty: true,
      rotateToVelocity: false,
      killType: 0,
      killDistance: 0,
      killLifeSpan: 0,
    };

    this._exists = true;
    this._alive = true;
  }

  /**
  * @name Tiny.Weapon.Bullet#exists
  * @property {boolean} exists 子弹是否存在
  */
  get exists() {
    return this._exists;
  }
  set exists(value) {
    return this._exists;
  }

  /**
  * @name Tiny.Weapon.Bullet#alive
  * @property {boolean} exists 子弹是否还活跃
  */
  get alive() {
    return this._alive;
  }

  /**
  * 销毁子弹
  * @method Tiny.Weapon.Bullet#kill
  */
  kill() {
    this._alive = false;
    this._exists = false;
    this.visible = false;
    this.dispatch('kill', this);
    console.log('kill');
    if (this.parent) {
      this.data.emitter.removeChild(this);
      this.parent = null;
    }
    return this;
  }

  /**
  * @private
  * @method Tiny.Weapon.Bullet#dispatch
  * @param {String} eventName - 事件名称
  * @param {any} args - 可变参数
  */
  dispatch(eventName, ...args) {
    this.emit.apply(this, arguments);
  }

  /**
  * 复活重用
  * @method Tiny.Weapon.Bullet#revive
  */
  revive() {
    this._alive = true;
    this._exists = true;
    this.visible = true;
    if (!this.parent) {
      this.data.emitter.addChild(this);
    }
    this.dispatch('revive', this);
  }

  /**
  * 更新子弹
  * @method Tiny.Weapon.Bullet#update
  */
  update() {
    if (!this.exists) {
      return;
    }

    if (this.data.killType === killTypes.KILL_LIFESPAN) {
      if ((this.data.emitter.timeNow - this.data.fireTime) > this.data.killLifeSpan) {
        this.kill();
      }
    } else if (this.data.killType === killTypes.KILL_DISTANCE) {
      if (WeaponMath.distance(this.x, this.y, this.data.fromX, this.data.fromY, true) > this.data.killDistance) {
        this.kill();
      }
    } else {
      if (!this.data.emitter.bulletBounds.contains(this.x, this.y)) {
        this.kill();
      }
    }

    if (this.data.rotateToVelocity) {
      this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    // TODO: Bullet world wrap？
  }

  /**
  * 重置子弹
  * @method Tiny.Weapon.Bullet#reset
  * @param {number} x - x 坐标
  * @param {number} y - y 坐标
  * @param {number} rotation - 旋转角度 弧度
  */
  reset(x = 0, y = 0, rotation = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  /**
  * 复制一个新的子弹
  * @method Tiny.Weapon.Bullet#clone
  */
  clone() {
    return new Bullet(this._baseTexture, this.data.emitter);
  }

}

export default Bullet;
