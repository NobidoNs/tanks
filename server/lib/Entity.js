/**
 * Wrapper class for all entities that need basic physics.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Constants = require('./Constants')
const Util = require('./Util')
const Vector = require('./Vector')

/**
 * Entity class.
 */
class Entity {
  /**
   * Constructor for an Entity class.
   * @param {Vector} position The position of the entity
   * @param {Vector} velocity The velocity of the entity
   * @param {Vector} acceleration The acceleration of the entity
   * @param {number} hitboxSize The radius of the entity's circular hitbox
   */
  constructor(position, velocity, acceleration, hitboxSize) {
    this.position = position || Vector.zero()
    this.velocity = velocity || Vector.zero()
    this.acceleration = acceleration || Vector.zero()
    this.hitboxSize = hitboxSize
  }

  /**
   * Returns true if this Entity's hitbox is overlapping or touching another
   * Entity's hitbox.
   * @param {Entity} other The Entity to check collision against
   * @return {boolean}
   */
  collided(other) {
    const minDistance = this.hitboxSize + other.hitboxSize
    return Vector.sub(this.position, other.position).mag2 <=
      minDistance * minDistance
  }

  bulletCollidedPipe(other, turretAngel, reverse) {
    // console.log(other)
    // console.log(other.position.x)
    const vx=other.position.x-this.position.x
    const vy=other.position.y-this.position.y
    let angle = Math.atan2(vy, vx)
    if (angle < 0) {
      angle+=2*Math.PI}
    // console.log(vx,vy)
    // console.log(angle)
    // console.log(Math.abs(angle-turretAngel-Math.PI))
    if (reverse==false) {
      if (Math.abs(angle-turretAngel)<=1) {return true}
    } else {
      if (Math.abs(angle-turretAngel-Math.PI)>=6) {return true}
    }
    return false
  }

  /**
   * Returns true if this Entity is inside the bounds of the game environment
   * world.
   * @return {boolean}
   */
  inWorld() {
    return Util.inBound(this.x, Constants.WORLD_MIN, Constants.WORLD_MAX) &&
      Util.inBound(this.y, Constants.WORLD_MIN, Constants.WORLD_MAX)
  }

  /**
   * Bounds this Entity's position within the game world if it is outside of the
   * game world.
   */
  boundToWorld() {
    this.position.x = Util.bound(
      this.position.x, Constants.WORLD_MIN, Constants.WORLD_MAX)
    this.position.y = Util.bound(
      this.position.y, Constants.WORLD_MIN, Constants.WORLD_MAX)
  }
}

module.exports = Entity
