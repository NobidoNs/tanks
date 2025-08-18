const Constants = require('../lib/Constants')
const Entity = require('../lib/Entity')
const Vector = require('../lib/Vector')
const Util = require('../lib/Util')

/**
 * Bullet class.
 */
class Bullet extends Entity {
  /**
   * Constructor for a Bullet object.
   * @constructor
   * @param {Vector} position The starting position vector
   * @param {Vector} velocity The starting velocity vector
   * @param {number} angle The orientation of the bullet
   * @param {Player} source The Player object firing the bullet
   */
  constructor(position, velocity, angle, source, type) {
    super(position, velocity, Vector.zero(), Constants.BULLET_HITBOX_SIZE)

    this.angle = angle
    this.source = source

    this.damage = Constants.BULLET_DEFAULT_DAMAGE+this.velocity.mag2
    this.distanceTraveled = 0
    this.cerateTime = source.lastUpdateTime
    this.destroyed = false
    this.type = type
  }

  /**
   * Creates a new Bullet object from a Player object firing it.
   * @param {Player} player The Player object firing the bullet
   * @param {number} [angleDeviation=0] The angle deviation if the bullet is
   *   not traveling in the direction of the turret
   * @return {Bullet}
   */
  static createFromPlayer(player, angleDeviation = 0, velocity, type) {
    const angle = player.turretAngle + angleDeviation
    return new Bullet(
      player.position.copy(),
      Vector.fromPolar(Constants.BULLET_SPEED+velocity, angle),
      angle,
      player,
      type
    )
  }

  static createFromPos(pos, source, angle, velocity, type) {
    return new Bullet(
      pos.copy(),
      Vector.fromPolar(Constants.BULLET_SPEED+velocity, angle),
      angle,
      source,
      type
    )
  }

  /**
   * Performs a physics update.
   * @param {number} lastUpdateTime The last timestamp an update occurred
   * @param {number} deltaTime The timestep to compute the update with
   */
  update(lastUpdateTime, deltaTime) {
    const distanceStep = Vector.scale(this.velocity, deltaTime)
    this.position.add(distanceStep)
    this.distanceTraveled += distanceStep.mag2
    if (this.inWorld() || distanceStep > Bullet.MAX_TRAVEL_DISTANCE_SQ) {
      this.destroyed = true
    }
  }

  static summonBadBullet(player, type) {
    let x = Util.randRangeInt(250, 500)
    let y = Util.randRangeInt(250, 500)
    if (Util.randRangeInt(1, 3) === 1) { x *= -1 }
    if (Util.randRangeInt(1, 3) === 1) { y *= -1 }
    const inWorldX = player.position.x - x
    const inWorldY = player.position.y - y
    const vel = Util.randRange(0.4,0.9)
    const angle = Math.atan2(y, x)
    return [
      new Bullet(
        Vector.fromArray([inWorldX, inWorldY]),
        Vector.fromPolar(vel, angle),
        angle,
        player,
        type
      )
    ]
  }
}

module.exports = Bullet
