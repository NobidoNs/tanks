const Constants = require('../lib/Constants')
const Util = require('../lib/Util')

class Beauty {  
  constructor(position, type, duration, cur_time) {
    this.type = type
    this.position = position
    this.end_time = duration+cur_time
    this.destroyed = false
  }

  static create(position, type, duration, cur_time) {
    return new Beauty(position, type, duration, cur_time)
  }

  update(cur_time) {
    if (cur_time > this.end_time) {
      this.destroyed = true
    }
  }
}

module.exports = Beauty
