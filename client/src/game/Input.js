/**
 * Input class.
 */
class Input {
  /**
   * Constructor for the Input class.
   */
  constructor() {
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.dash = false
    this.talantTree = false
    this.invis = false
    this.bomb = false
    this.blast = false
    this.gun = 'collecter'
    this.mouseDown = false
    this.mouseCoords = [0, 0]
  }

  /**
   * Factory method for creating an Input class.
   * @param {Element} keyElement The element to listen for keypresses and
   *   mouse clicks on
   * @param {Element} mouseMoveElement The element to track mouse coordinates
   *   relative to
   * @return {Input}
   */
  static create(keyElement, mouseMoveElement, mouseMove2) {
    const input = new Input()
    input.applyEventHandlers(keyElement, keyElement, mouseMoveElement, mouseMove2)
    return input
  }

  /**
   * Key down event handler.
   * @param {Event} event The event passed to the event handler
   */
  onKeyDown(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
      this.left = true
      break
    case 38:
    case 87:
      this.up = true
      break
    case 39:
    case 68:
      this.right = true
      break
    case 40:
    case 83:
      this.down = true
      break
    case 81:
      this.gun = 'collecter'
      break
    case 69:
      this.gun = 'pipe'
      break
    case 82:
      this.gun = 'lazer'
      break
    case 70:
      this.gun = 'illusion'
      break
    case 67:
      this.gun = 'slime'
      break
    case 88:
      this.gun = 'phis_stun'
      break
    case 90:
      this.gun = 'mag_stun'
      break
    case 86:
      this.gun = 'blaster'
      break
    case 32:
      this.dash = true
      break
    case 50:
      this.bomb = true
      break
    case 20:
      this.blast = true
      break
    case 49:
      if (this.invis == false) {
        this.invis = true
      }else {this.invis = false}
      break
    case 16:
      this.talantTree = true
      break
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  /**
   * Key up event handler.
   * @param {Event} event The event passed to the event handler
   */
  onKeyUp(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
    case 97:
      this.left = false
      break
    case 38:
    case 87:
    case 199:
      this.up = false
      break
    case 39:
    case 68:
    case 100:
      this.right = false
      break
    case 40:
    case 83:
    case 115:
      this.down = false
    case 32:
      this.dash = false
      break
    case 50:
      this.bomb = false
      break
    case 20:
      this.blast = false
      break
    case 16:
      this.talantTree = false
      break
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  /**
   * Mouse down event handler.
   * @param {Event} event The event passed to the event handler
   */
  onMouseDown(event) {
    if (event.which === 1) {
      this.mouseDown = true
    }
  }

  /**
   * Mouse up event handler.
   * @param {Event} event The event passed to the event handler
   */
  onMouseUp(event) {
    if (event.which === 1) {
      this.mouseDown = false
    }
  }

  /**
   * Mouse move event handler.
   * @param {Event} event The event passed to the event handler
   */
  onMouseMove(event) {
    this.mouseCoords = [event.clientX, event.clientY]
  }

  /**
   * Applies the event handlers to elements in the DOM.
   * @param {Element} keyElement The element to track keypresses on
   * @param {Element} mouseClickElement The element to track mouse clicks on
   * @param {Element} mouseMoveElement The element to track mouse movement
   *   relative to
   */
  applyEventHandlers(keyElement, mouseClickElement, mouseMoveElement, mouseMove2) {
    keyElement.addEventListener('keydown', this.onKeyDown.bind(this))
    keyElement.addEventListener('keyup', this.onKeyUp.bind(this))
    mouseClickElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    mouseClickElement.addEventListener('mouseup', this.onMouseUp.bind(this))
    mouseMoveElement.setAttribute('tabindex', 1)
    mouseMoveElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    mouseMove2.setAttribute('tabindex', 1)
    mouseMove2.addEventListener('mousemove', this.onMouseMove.bind(this))
  }
}

module.exports = Input
