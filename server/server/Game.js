/**
features:
  minimap
  stun bomb
  gun recoil
  particles
todo:
  scaner
  multi shoot
  blast
  add button name in icons
  can learn spell/gun
 */

const Bullet = require('./Bullet')
const Player = require('./Player')
const Powerup = require('./Powerup')
const Beauty = require('./VisualEffect')

const Util = require('../lib/Util')
const Constants = require('../lib/Constants')

/**
 * Game class.
 */
class Game {
  /**
   * Constructor for a Game object.
   */
  constructor() {
    /**
     * This is a Map containing all the connected socket ids and socket
     * instances.
     */
    this.clients = new Map()
    /**
     * This is a Map containing all the connected socket ids and the players
     * associated with them. This should always be parallel with sockets.
     */
    this.players = new Map()
    this.projectiles = []
    this.powerups = []
    this.beauty = []
    this.visualEffects = []

    this.lastSummonTime = 0
    this.lastUpdateTime = 0
    this.deltaTime = 0
  }

  /**
   * Creates a new Game object.
   * @return {Game}
   */
  static create() {
    const game = new Game()
    game.init()
    return game
  }

  /**
   * Initializes the game state.
   */
  init() {
    this.lastUpdateTime = Date.now()
  }

  /**
   * Creates a new player with the given name and ID.
   * @param {string} name The display name of the player.
   * @param {Object} socket The socket object of the player.
   */
  addNewPlayer(name, socket) {
    this.clients.set(socket.id, socket)
    this.players.set(socket.id, Player.create(name, socket.id))
  }

  /**
   * Removes the player with the given socket ID and returns the name of the
   * player removed.
   * @param {string} socketID The socket ID of the player to remove.
   * @return {string}
   */
  removePlayer(socketID) {
    if (this.clients.has(socketID)) {
      this.clients.delete(socketID)
    }
    if (this.players.has(socketID)) {
      const player = this.players.get(socketID)
      this.players.delete(socketID)
      return player.name
    }
  }

  /**
   * Returns the name of the player with the given socket id.
   * @param {string} socketID The socket id to look up.
   * @return {string}
   */
  getPlayerNameBySocketId(socketID) {
    if (this.players.has(socketID)) {
      return this.players.get(socketID).name
    }
  }

  /**
   * Updates the player with the given socket ID according to the input state
   * object sent by the player's client.
   * @param {string} socketID The socket ID of the player to update
   * @param {Object} data The player's input state
   */
  updatePlayerOnInput(socketID, data) {
    const player = this.players.get(socketID)
    if (player) {
      player.updateOnInput(data)
      this.tryShoot(data.shoot, player)
      this.useSpell(data, player)
      
      if (data.desired != []) {player.unlockSpell(data.desired)}
    }
  }

  tryShoot(needShoot, player) {
    if (needShoot && player.canShoot()) {
      switch (player.gun) {
        case 'pipe':
          const projectiles = player.getProjectilesFromShot(-1, 'pipeBullet')
          this.projectiles.push(...projectiles)
          break
        case 'lazer': 
          if (player.energy>=Constants.SHOOT_ENERGIES['lazer']) {
            const projectiles = player.getProjectilesFromShot(2, 'lazerBullet')
            this.projectiles.push(...projectiles)
            player.energyAdd(-Constants.SHOOT_ENERGIES['lazer'])
          }
          break
        case 'illusion': 
          if (player.energy>=Constants.SHOOT_ENERGIES['illusion']) {
            const projectiles = player.getProjectilesFromShot(-1, 'illusionBullet')
            this.projectiles.push(...projectiles)
            player.energyAdd(-Constants.SHOOT_ENERGIES['illusion'])
          }
          break
        case 'slime':
          if (player.energy>=Constants.SHOOT_ENERGIES['slime']) {
            const projectiles = player.getProjectilesFromShot(2, 'slimeBullet')
            this.projectiles.push(...projectiles)
            player.energyAdd(-Constants.SHOOT_ENERGIES['slime'])
          }
          break
        case 'phis_stun':
          if (player.energy>=Constants.SHOOT_ENERGIES['phis_stun']) {
            const projectiles = player.getProjectilesFromShot(2, 'phis_stunBullet')
            this.projectiles.push(...projectiles)
            player.energyAdd(-Constants.SHOOT_ENERGIES['phis_stun'])
          }
          break
        case 'mag_stun':
          if (player.energy>=Constants.SHOOT_ENERGIES['mag_stun']) {
            const projectiles = player.getProjectilesFromShot(2, 'mag_stunBullet')
            this.projectiles.push(...projectiles)
            player.energyAdd(-Constants.SHOOT_ENERGIES['mag_stun'])
          }
          break
      }
    }
  }

  useSpell(data, player) {
    if (data.dash && player.canDash()) {
      player.doDash()
    }

    if (data.bomb && player.canBomb()) {
      this.powerups.push(player.doBomb())
    }

    if (data.invis && player.canInvis()) {
        player.energyAdd(-0.01)
        player.doInvis(true)
    } else {
      player.doInvis(false)
    }
  }

  badBullets(curTime) {
    this.players.forEach(
      player => {
        if (curTime > player.lastBadBulletSummon+player.deltaSummon) {
          player.lastBadBulletSummon = curTime
          player.deltaSummon = Util.randRangeInt(2000, 4000)
          const projectiles = Bullet.summonBadBullet(player, 'badBullet')
          this.projectiles.push(...projectiles)
        }
      }
    )
  }

  /**
   * Updates the state of all the objects in the game.
   */  
  update() {
    const currentTime = Date.now()
    this.deltaTime = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime
    this.badBullets(currentTime)

    this.beauty.forEach(
      effect => {
        if (this.lastUpdateTime > effect['endTime']) {
          effect['destroyed']=true
        }
      }
    )
    /**
     * Perform a physics update and collision update for all entities
     * that need it.
     */
    const entities = [
      ...this.players.values(),
      ...this.projectiles,
      ...this.powerups
    ]

    entities.forEach(
      entity => {
        if (entity instanceof Player) {
          entity.update(this.lastUpdateTime, this.deltaTime, Array.from(this.players.values()))
        } else {
          entity.update(this.lastUpdateTime, this.deltaTime)
        }
      }
    )
    for (let i = 0; i < entities.length; ++i) {
      for (let j = i + 1; j < entities.length; ++j) {
        let e1 = entities[i]
        let e2 = entities[j]
        if (!e1.collided(e2)) {
          continue
        }

        if (e1 instanceof Player && e2 instanceof Player) {
          e1.applyEffect('slime')
          e2.applyEffect('slime')
        }

        // Player-Bullet collision interaction
        if (e1 instanceof Bullet && e2 instanceof Player) {
          e1 = entities[j]
          e2 = entities[i]
        }
        if (e1 instanceof Player && e2 instanceof Bullet &&
          (e2.source !== e1 || e2.type == 'badBullet')) {
            let reverse = false

            if (e2.type=='illusionBullet') {
              reverse = true
            }
            if (e2.type=='mag_stunBullet') {
              e1.applyEffect('stun')
            } else {

              if (e1.bulletCollidedPipe(e2,e1.turretAngle, reverse) && e1.gun=='collecter') {
                e1.energyAdd(e2.damage)
              } else {
                if (e2.type=='slimeBullet') {
                  e1.applyEffect('slime')
                }
                if (e2.type=='phis_stunBullet') {
                  e1.applyEffect('stun')
                }
                e1.damage(e2.damage)

                if (e1.isDead()) {
                  e1.spawn(true)
                  e1.deaths++
                  if (e2.type != 'badBullet') {
                    e2.source.kills++
                  }
                }

              }
            }

          e2.destroyed = true
        }

        // Player-Powerup collision interaction
        if (e1 instanceof Powerup && e2 instanceof Player) {
          e1 = entities[j]
          e2 = entities[i]
        }
        if (e1 instanceof Player && e2 instanceof Powerup && e2.creator!=e1.socketID) {
          e1.applyPowerup(e2)
          e2.destroyed = true
          if (e1.isDead()) {
            e1.spawn(true)
            e1.deaths++
            this.players.get(e2.creator)['kills']++
            // e2.source.kills++
          }
        } 

        // Bullet-Bullet interaction
        if (e1 instanceof Bullet && e2 instanceof Bullet) {
          let e1_copy = {...e1}
          e1_copy['endTime'] = this.lastUpdateTime+Constants.VISUAL_DURATION['bullets']
          let e2_copy = {...e2}
          e2_copy['endTime'] = this.lastUpdateTime+Constants.VISUAL_DURATION['bullets']
          this.beauty.push(e1_copy, e2_copy)

          e1.destroyed = true
          e2.destroyed = true
        }

        // Bullet-Powerup interaction
        if (e1 instanceof Bullet && e2 instanceof Powerup) {
          e1 = entities[j]
          e2 = entities[i]
        }
        if (e1 instanceof Powerup && e2 instanceof Bullet) {
          e1.destroyed = true
          e2.destroyed = true
          if (e2.type == 'lazerBullet') {
            e2.destroyed = false
          } else if (e2.type == 'badBullet' && e1.type == 'bomb') {
            e1.destroyed = false
          }
          
        }

        // Powerup-Powerup interaction
        if (e1 instanceof Powerup && e2 instanceof Powerup && 
        e1.type != Constants.POWERUP_HEALTHPACK && e2.type != Constants.POWERUP_HEALTHPACK) {
          e1.destroyed = true
          e2.destroyed = true
          const creator = this.players.get(e1.creator)
          creator.damage(e1.data+e2.data)
          this.beauty.push(Beauty.create(
            e1.position,'powPowBoom',Constants.VISUAL_DURATION['explosion'], this.lastUpdateTime))
          if (creator.isDead()) {
            creator.spawn(true)
            creator.deaths++
          }
        }
      }
    }

    /**
     * Filters out destroyed projectiles and powerups.
     */
    this.projectiles = this.projectiles.filter(
      projectile => !projectile.destroyed)
    this.powerups = this.powerups.filter(
      powerup => !powerup.destroyed)
    this.beauty = this.beauty.filter(
      beauty => !beauty.destroyed)

    /**
     * Repopulate the world with new powerups.
     */
    while (this.powerups.length < Constants.POWERUP_MAX_COUNT) {
      this.powerups.push(Powerup.create())
    }
  }

  /**
   * Sends the state of the game to all connected players.
   */
  sendState() {
    const players = [...this.players.values()]
    this.clients.forEach((client, socketID) => {
      const currentPlayer = this.players.get(socketID)
      this.clients.get(socketID).emit(Constants.SOCKET_UPDATE, {
        self: currentPlayer,
        players: players,
        projectiles: this.projectiles,
        powerups: this.powerups,
        beauty: this.beauty
      })
    })
  }
}

module.exports = Game
