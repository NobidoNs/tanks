/**
 * A class encapsulating the state of a powerup on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Constants = require('../lib/Constants')
const Entity = require('../lib/Entity')
const Util = require('../lib/Util')
const Vector = require('../lib/Vector')

/**
 * Powerup class.
 * @extends Entity
 */
class Powerup extends Entity {
  /**
   * Constructor for a Powerup object.
   * @param {Vector} position The position of the powerup
   * @param {string} type The type of powerup
   * @param {?} data Data associated with the powerup
   * @param {number} duration How long the powerup will last in milliseconds
   */
  
  constructor(position, type, data, duration, creator='', hitbox=Constants.POWERUP_HITBOX_SIZE) {
    super(position, null, null, hitbox)

    this.type = type
    this.data = data
    this.duration = duration
    this.expirationTime = 0
    this.creator = creator

    this.destroyed = false
  }

  /**
   * Creates a new Powerup object randomly placed in the world.
   * @return {Powerup}
   */
  static create() {
    const position = new Vector(
      Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING,
        Constants.WORLD_MAX - Constants.WORLD_PADDING),
      Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING,
        Constants.WORLD_MAX - Constants.WORLD_PADDING))
    // const type = Util.choiceArray(Constants.POWERUP_KEYS)
    const type = Constants.POWERUP_HEALTHPACK
    const dataRanges = Constants.POWERUP_DATA[type]
    const data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
    // let data = null
    // switch (type) {
    // case Constants.POWERUP_HEALTHPACK:
    //   data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
    //   break
    // case Constants.POWERUP_SHOTGUN:
    //   data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
    //   break
    // case Constants.POWERUP_RAPIDFIRE:
    //   data = Util.randRange(dataRanges.MIN, dataRanges.MAX)
    //   break
    // case Constants.POWERUP_SPEEDBOOST:
    //   data = Util.randRange(dataRanges.MIN, dataRanges.MAX)
    //   break
    // case Constants.POWERUP_SHIELD:
    //   data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
    //   break
    // }
    const duration = Util.randRange(
      Constants.POWERUP_MIN_DURATION, Constants.POWERUP_MAX_DURATION)
    return new Powerup(position, type, data, duration)
  }

  /**
   * Updates this Powerup's expiration time.
   * @param {number} lastUpdateTime The last timestamp an update occurred
   */
  update(lastUpdateTime) {
    this.expirationTime = lastUpdateTime + this.duration
  }

  static createBomb(position, duration, creator) {
    const damage = Util.randRangeInt(10,20)
    return new Powerup(position, 'bomb', damage, duration, creator, Constants.BOMB_HITBOX_SIZE)
  }
}

module.exports = Powerup
