import * as TinyMath from './math';
/**
 * Point
 * @class Point
 * @constructor
 * @memberof Tiny.Weapon
 * @extends Tiny.Point
 */
class Point extends Tiny.Point {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    super(x, y);
  }

  /**
  * x,y坐标翻转 x=y ,y=x
  *
  * @method Tiny.Weapon.Point#invert
  * @return {Tiny.Weapon.Point} 当前Point对象 方便链式调用
  */
  invert() {
    this.setTo(this.y, this.x);
    return this;
  }

  /**
   * 重新设置x,y坐标
   * @method Tiny.Weapon.Point#setTo
   * @param {number} x - x 坐标
   * @param {number} y - y 坐标
   * @return {Tiny.Weapon.Point} 当前Point对象 方便链式调用
   */
  setTo(x, y) {
    this.set(x, y);
    return this;
  }

  /**
   * 计算目标点的位置
   * @method Tiny.Weapon.Point#distance
   * @param {Point|Sprite|object} dest - 具有x,y坐标的对象
   * @param {boolean} round - 是否使用Math.round计算
   * @return {number} distance距离目标的距离
   */
  distance(dest, round) {
    // return Phaser.Point.distance(this, dest, round);
    const a = this;
    const b = dest;
    const distance = TinyMath.distance(a.x, a.y, b.x, b.y);
    return round ? Math.round(distance) : distance;
  }

  /**
   * 判断点是否 0,0.
   *
   * @method Tiny.Weapon.Point#isZero
   * @return {boolean} True 点坐标是 0,0, 否则 false.
   */
  isZero() {
    return (this.x === 0 && this.y === 0);
  }

  /**
  * 减法操作 x-=x,y-=y
  *
  * @method Tiny.Weapon.Point#subtract
  * @param {number} x - 要减去的 x 坐标.
  * @param {number} y - 要减去的 y 坐标.
  * @return {Tiny.Weapon.Point} 当前Point对象 ，方便去做链式调用.
  */
  subtract(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
  * 把这个点按照给定的(x,y)坐标为锚点 旋转指定角度angle
  *
  * @method Point#rotate
  * @param {number} x - 锚点 x 坐标.
  * @param {number} y - 锚点 y 坐标.
  * @param {number} angle - 角度
  * @param {boolean} [asDegrees=false] -radians计算单位 如果asDegrees是true 以360度degree作为计量单位 否则弧度radians为计量单位
  * @param {number} [distance] - An optional distance constraint between the Point and the anchor.
  * @return {Phaser.Point} 修改后的Point对象.
  */
  rotate(x, y, angle, asDegrees, distance) {
    const a = this;
    if (asDegrees) {
      angle = TinyMath.degToRad(angle);
    }

    if (distance === undefined) {
      a.subtract(x, y);

      const s = Math.sin(angle);
      const c = Math.cos(angle);

      const tx = c * a.x - s * a.y;
      const ty = s * a.x + c * a.y;

      a.x = tx + x;
      a.y = ty + y;
    } else {
      const t = angle + Math.atan2(a.y - y, a.x - x);
      a.x = x + distance * Math.cos(t);
      a.y = y + distance * Math.sin(t);
    }

    return a;
  }

}

export default Point;
