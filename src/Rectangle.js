/**
 * Rectangle
 * @class Rectangle
 * @constructor
 * @memberof Tiny.Weapon
 * @extends Tiny.Rectangle
 */
class Rectangle extends Tiny.Rectangle {
  /**
   * @param {number} [x=0] - x坐标
   * @param {number} [y=0] - y坐标
   * @param {number} [width=0] - 宽度
   * @param {number} [height=0] - 高度
   */
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super(x, y, width, height);
  }

  /**
   * 把矩形的中心点设置在x,y
   * @name Tiny.Weapon.Rectangle#halfWidth
   * @property {number} x - x 坐标
   * @property {number} y - y 坐标
   */
  centerOn(x, y) {
    this.centerX = x;
    this.centerY = y;
    return this;
  }

  /**
  * 宽度的1/2
  * @name Tiny.Weapon.Rectangle#halfWidth
  * @property {number} halfWidth - 宽度的1/2
  */
  get halfWidth() {
    return this.width / 2;
  }

  /**
  * 高度的1/2
  * @name Tiny.Weapon.Rectangle#halfWidth
  * @property {number} halfWidth - 高度的1/2
  */
  get halfHeight() {
    this.x = this.height / 2;
  }

  /**
  * 矩形中心的x坐标
  * @name Tiny.Weapon.Rectangle#centerY
  * @property {number} centerY - 矩形中心的x坐标
  */
  get centerX() {
    return this.x + this.halfWidth;
  }
  set centerX(value) {
    this.x = value - this.halfWidth;
  }

  /**
  * 矩形中心的y坐标
  * @name Tiny.Weapon.Rectangle#centerY
  * @property {number} centerY - 矩形中心的y坐标
  */
  get centerY() {
    return this.y + this.halfHeight;
  }
  set centerY(value) {
    this.y = value - this.halfHeight;
  }

  /**
  * @name Tiny.Weapon.Rectangle#randomX
  * @property {number} randomX - 介于矩形的左边界和右边界之间的随机数
  */
  get randomX() {
    return this.x + (Math.random() * this.width);
  }

  /**
  * @name Tiny.Weapon.Rectangle#randomY
  * @property {number} randomY - 介于矩形的上边界和下边界之间的随机数
  */
  get randomY() {
    return this.y + (Math.random() * this.height);
  }
}

export default Rectangle;
