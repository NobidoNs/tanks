/**
 * Class encapsulating the client side of the game, handles drawing and
 * updates.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const $ = require('jquery')

const Drawing = require('./Drawing')
const Input = require('./Input')
const Leaderboard = require('./Leaderboard')
const Viewport = require('./Viewport')
const Table = require('./table')

const Constants = require('lib/Constants')
const Vector = require('lib/Vector')
const Util = require('lib/Util')
const Cooldown = require('./cooldown')

/**
 * Game class.
 */
class Game {
  /**
   * Creates a Game class.
   * @param {Socket} socket The socket connected to the server
   * @param {Viewport} viewport The Viewport object for coordinate translation
   * @param {Drawing} drawing The Drawing object for canvas rendering
   * @param {Input} input The Input object for tracking user input
   * @param {Leaderboard} leaderboard The Leaderboard object handling the
   *   leaderboard update
   */
  constructor(socket, viewport, drawing, input, leaderboard, cooldowns, table) {
    this.socket = socket

    this.tb = table
    this.tb.generateTable()
    this.viewport = viewport
    this.drawing = drawing
    this.input = input
    this.leaderboard = leaderboard
    this.cooldowns = cooldowns

    this.self = null
    this.players = []
    this.projectiles = []
    this.powerups = []
    this.desired = []

    this.animationFrameId = null
    this.lastUpdateTime = 0
    this.deltaTime = 0

    this.updateTable = false
    this.imgs = []
    this.beauty = []
  }

  /**
   * Factory method for creating a Game class instance.
   * @param {Socket} socket The socket connected to the server
   * @param {string} canvasElementID The ID of the canvas element to render the
   *   game to
   * @param {string} leaderboardElementID The ID of the DOM element which will
   *   hold the leaderboard
   * @return {Game}
   */
  static create(socket, canvasElementID, leaderboardElementID, talantTreeID) {
    const canvas = document.getElementById(canvasElementID)
    const talantTree = document.getElementById(talantTreeID)
    canvas.width = window.screen.width
    // screen.height return bad answer (9.2 is pick coefficent)
    canvas.height = window.screen.height-window.screen.height/9.2 

    // console.log(canvas)
    // console.log(window.screen.height, window.screen.width)

    const viewport = Viewport.create(canvas)
    const drawing = Drawing.create(canvas, viewport)
    const input = Input.create(document, canvas, talantTree)

    const leaderboard = Leaderboard.create(leaderboardElementID)
    const cooldowns = Cooldown.create()
    const table = new Table

    const game = new Game(socket, viewport, drawing, input, leaderboard, cooldowns, table)
    game.init()
    return game
  }

  /**
   * Initializes the Game object and binds the socket event listener.
   */
  init() {
    this.lastUpdateTime = Date.now()
    this.socket.on(Constants.SOCKET_UPDATE,
      this.onReceiveGameState.bind(this))
  }

  /**
   * Socket event handler.
   * @param {Object} state The game state received from the server
   */
  onReceiveGameState(state) {
    this.self = state.self
    this.players = state.players
    this.projectiles = state.projectiles
    this.powerups = state.powerups
    this.beauty = state.beauty
    this.updateTable = state.self.updateTable
    this.viewport.updateTrackingPosition(state.self)
    this.leaderboard.update(state.players)
    this.cooldowns.update(state.players)
    this.tb.pasteImages(state.self.imgs)
  }

  /**
   * Starts the animation and update loop to run the game.
   */
  run() {
    const currentTime = Date.now()
    this.deltaTime = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime

    this.update()
    this.draw()
    this.animationFrameId = window.requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Stops the animation and update loop for the game.
   */
  stop() {
    window.cancelAnimationFrame(this.animationFrameId)
  }

  /**
   * Updates the client state of the game and sends user input to the server.
   */
  update() {
    if (this.self) {
      this.viewport.update(this.deltaTime)
      let absoluteMouseCoords = this.viewport.toWorld(
        Vector.fromArray(this.input.mouseCoords))
      const playerToMouseVector = Vector.sub(this.self.position,
        absoluteMouseCoords)
      
      this.tb.update(this.input.talantTree, this.updateTable)
      
      let shoot = this.input.mouseDown
      if (this.input.talantTree) {shoot = false}

      this.socket.emit(Constants.SOCKET_PLAYER_ACTION, {
        up: this.input.up,
        down: this.input.down,
        left: this.input.left,
        right: this.input.right,
        shoot: shoot,
        turretAngle: Util.normalizeAngle(playerToMouseVector.angle + Math.PI),
        gun: this.input.gun,
        dash: this.input.dash,
        bomb: this.input.bomb,
        invis: this.input.invis,
        desired: this.desired
      })
    }
  }

  learn(row, col) {
    this.desired = [row, col]
  }

  /**
   * Draws the state of the game to the canvas.
   */
  draw() {
    if (this.self) {
      this.drawing.clear()

      this.drawing.drawTiles()

      this.projectiles.forEach(this.drawing.drawBullet.bind(this.drawing))

      this.powerups.forEach(this.drawing.drawPowerup.bind(this.drawing))

      this.players.forEach(tank => {if (tank.socketID!=this.self.socketID) {this.drawing.drawTank(false, tank)}})

      this.drawing.drawTank(true, this.self)

      this.beauty.forEach(this.drawing.drawBeauty.bind(this.drawing))
    }
  }
}

module.exports = Game
