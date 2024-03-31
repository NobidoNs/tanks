/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author kennethli.3470@gmail.com (Kenneth Li)
 */

const Constants = require('lib/Constants')
const Util = require('lib/Util')

/**
 * Drawing class.
 */
class Drawing {
  /**
   * Constructor for the Drawing class.
   * @param {CanvasRenderingContext2D} context The canvas context to draw to
   * @param {Object<string, Image>} images The image assets for each entity
   * @param {Viewport} viewport The viewport class to translate from absolute
   *   world coordinates to relative cannon coordinates.
   */
  constructor(context, images, viewport) {
    this.context = context
    this.images = images
    this.viewport = viewport

    this.width = context.canvas.width
    this.height = context.canvas.height
  }

  /**
   * Factory method for creating a Drawing object.
   * @param {Element} canvas The canvas element to draw to
   * @param {Viewport} viewport The viewport object for coordinate translation
   * @return {Drawing}
   */
  static create(canvas, viewport) {
    const context = canvas.getContext('2d')
    const images = {}
    for (const key of Constants.DRAWING_IMG_KEYS) {
      images[key] = new Image()
      images[key].src = `${Constants.DRAWING_IMG_BASE_PATH}/${key}.png`
    }
    for (const type of Constants.POWERUP_KEYS) {
      images[type] = new Image()
      images[type].src =
        `${Constants.DRAWING_IMG_BASE_PATH}/${type}_powerup.png`
    }
    return new Drawing(context, images, viewport)
  }

  /**
   * Convert an angle from the real math system to funky canvas coordinates.
   * @param {number} angle The angle to translate
   * @return {number}
   */
  static translateAngle(angle) {
    return Util.normalizeAngle(angle + Math.PI / 2)
  }

  /**
   * Draws an image on the canvas at the centered at the origin.
   * @param {Image} image The image to draw on the canvas
   */
  drawCenteredImage(image, opacity=1) {
    // console.log(opacity)
    this.context.globalAlpha = opacity
    this.context.drawImage(image, -image.width / 2, -image.height / 2)
    this.context.globalAlpha = 1
  }

  /**
   * Clears the canvas.
   */
  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  /**
   * Draws a player to the canvas as a tank.
   * @param {boolean} isSelf If this is true, then a green tank will be draw
   *   to denote the player's tank. Otherwise a red tank will be drawn to
   *   denote an enemy tank.
   * @param {Player} player The player object to draw.
   */
  drawTank(isSelf, player) {
    // console.log(player)
    let part = 1
    if (player['invis']) {
      // console.log(player['lastUpdateTime'],player['startCasteTime'])
      const deltaTime = player['lastUpdateTime']-player['startCasteTime']
      if (deltaTime>Constants.PLAYER_INVIS_CASTE) {
        part = 10
      } else if (deltaTime>Constants.PLAYER_INVIS_CASTE*3/4) {
        part = 3
      } else if (deltaTime>Constants.PLAYER_INVIS_CASTE*2/4) {
        part = 2
      } else if (deltaTime>Constants.PLAYER_INVIS_CASTE/4) {
        part = 1
      }
    }

    this.context.save()
    const canvasCoords = this.viewport.toCanvas(player.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)

    this.context.textAlign = 'center'
    this.context.font = Constants.DRAWING_NAME_FONT
    this.context.fillStyle = Constants.DRAWING_NAME_COLOR
    this.context.globalAlpha = 1/part
    this.context.fillText(player.name, 0, -70)

    for (let i = 0; i < Constants.PLAYER_MAX_HEALTH; ++i) {
      if (i < player.health) {
        this.context.fillStyle = Constants.DRAWING_HP_COLOR
      } else {
        this.context.fillStyle = Constants.DRAWING_HP_MISSING_COLOR
      }
      this.context.fillRect(-35 + 0.7 * i, -60, 0.7, 4)
    }

    for (let i = 0; i < Constants.PLAYER_MAX_ENERGY; ++i) {
      if (i < player.energy) {
        this.context.fillStyle = Constants.DRAWING_ENERGY_COLOR
      } else {
        this.context.fillStyle = Constants.DRAWING_ENERGY_MISSING_COLOR
      }
      this.context.fillRect(-35 + 0.7 * i, -50, 0.7, 4)
    }
    this.context.rotate(Drawing.translateAngle(player.tankAngle+Math.PI/2))
    // console.log(player.turretAngle)

    this.drawCenteredImage(this.images[
      Constants.DRAWING_IMG_SELF_TANK
    ], 1/part)
    this.context.rotate(-Drawing.translateAngle(player.tankAngle))

    this.context.rotate(Drawing.translateAngle(player.turretAngle))
    // this.context.fillStyle = Constants.DRAWING_HP_MISSING_COLOR
    // this.context.fillRect(0, -10, 40, 20)
    // this.context.rotate(Drawing.translateAngle(player.turretAngle+Math.PI))

    let turret = Constants.DRAWING_IMG_SELF_TURRET
    Object.keys(Constants.GUN_TYPES).forEach(element => {
      if (player.gun == element) {turret = Constants.GUN_TYPES[element]}
    });
    this.drawCenteredImage(this.images[turret], 1/part)

    if (player.powerups[Constants.POWERUP_SHIELD]) {
      this.context.rotate(-Drawing.translateAngle(-player.turretAngle))
      this.drawCenteredImage(this.images[Constants.DRAWING_IMG_SHIELD])
    }

    this.context.restore()
  }

  /**
   * Draws a bullet (tank shell) to the canvas.
   * @param {Bullet} bullet The bullet to draw to the canvas
   */
  drawBullet(bullet) {
    // console.log(bullet.type)
    let img = ''
    switch (bullet.type) {
    case "pipeBullet":
      img = Constants.DRAWING_IMG_PIPE_BULLET
      break
    case "lazerBullet":
      img = Constants.DRAWING_IMG_LAZER_BULLET
      break
    case "badBullet":
      img = Constants.DRAWING_IMG_BAD_BULLET
      break
    case "illusionBullet":
      img = Constants.DRAWING_IMG_ILLUSION_BULLET
      break
    }
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(bullet.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    this.context.rotate(Drawing.translateAngle(bullet.angle)-Math.PI/2)
    this.drawCenteredImage(this.images[img])
    this.context.restore()
  }

  /**
   * Draws a powerup to the canvas.
   * @param {Powerup} powerup The powerup to draw
   */
  drawPowerup(powerup) {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(powerup.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    this.drawCenteredImage(this.images[powerup.type])
    this.context.restore()
  }

  /**
   * Draws the background tiles to the canvas.
   */
  drawTiles() {
    const start = this.viewport.toCanvas(
      { x: Constants.WORLD_MIN, y: Constants.WORLD_MIN })
    const end = this.viewport.toCanvas(
      { x: Constants.WORLD_MAX, y: Constants.WORLD_MAX })
    for (let x = start.x; x < end.x; x += Constants.DRAWING_TILE_SIZE) {
      for (let y = start.y; y < end.y; y += Constants.DRAWING_TILE_SIZE) {
        this.context.drawImage(this.images[Constants.DRAWING_IMG_TILE], x, y)
      }
    }
  }
}

module.exports = Drawing
