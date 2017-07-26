/**
 * @namespace killTypes
 * @memberof Tiny.Weapon
 */

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_NEVER
* @property {number} KILL_NEVER 子弹不自动销毁
*/
export const KILL_NEVER = 0;

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_LIFESPAN
* @property {integer} KILL_LIFESPAN 子弹在规定的生命周期内销毁
*/
export const KILL_LIFESPAN = 1;

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_DISTANCE
* @property {integer} KILL_DISTANCE 子弹在规定的距离内销毁
*/
export const KILL_DISTANCE = 2;

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_WEAPON_BOUNDS
* @property {integer} KILL_WEAPON_BOUNDS 超出子弹发射器的边界
*/
export const KILL_WEAPON_BOUNDS = 3;

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_CAMERA_BOUNDS
* @property {integer} KILL_CAMERA_BOUNDS 超出摄像机的可视区域自动销毁
*/
export const KILL_CAMERA_BOUNDS = 4;

/**
* @constant
* @name Tiny.Weapon.killTypes#KILL_WORLD_BOUNDS
* @property {integer} KILL_WORLD_BOUNDS 超出游戏边界自动销毁
*/
export const KILL_WORLD_BOUNDS = 5;
