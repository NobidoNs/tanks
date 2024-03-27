const $ = require('jquery')
class Cooldown {
    constructor(container) {
      this.container = container
    }

    static create(containerElementID) {
      return new Cooldown(document.getElementById(containerElementID))
    }

    update(spels=[]) {
      spels.forEach(element => {
        // $("#dashCD0-img").show()
        // console.log(element['lastUpdateTime']-element['lastDashTime'])
        const delta_time = element['lastUpdateTime']-element['lastDashTime']
        if (delta_time<=2000) {
            $('#dashCD0-img').show()
        } else if (delta_time <= 4000) {
            $('#dashCD0-img').hide()
            $('#dashCD1-img').show()
        } else if (delta_time <= 6000) {
            $('#dashCD1-img').hide()
            $('#dashCD2-img').show()
        } else if (delta_time <= 8000) {
            $('#dashCD2-img').hide()
            $('#dashCD3-img').show()
        } else {
            $('#dashCD3-img').hide()
        }
      });
    }
  }
  
  module.exports = Cooldown