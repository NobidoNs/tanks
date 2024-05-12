class Beauty {  
  constructor(position, type, duration, cur_time, data={}) {
    this.type = type
    this.position = position
    this.endTime = duration+cur_time
    this.destroyed = false
    this.data = data
  }

  static create(position, type, duration, cur_time, data={}) {
    return new Beauty(position, type, duration, cur_time, data)
  }
}

module.exports = Beauty
