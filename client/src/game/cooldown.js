const $ = require('jquery')
class Cooldown {
    constructor(container) {
      this.container = container
    }

    static create(containerElementID) {
      return new Cooldown(document.getElementById(containerElementID))
    }

    update(pl=[]) {
      const player = pl[0]
      const startTimes = ['lastDashTime']
      const spells = ['dash']
      for (let i = 0; i < startTimes.length; i++) {
        const delta_time = player['lastUpdateTime']-player[startTimes[i]]
        let name = '#'+spells[i]
        if (delta_time<=2000) {
            $('#empty-img').hide()
            $(name+'CD0-img').show()
        } else if (delta_time <= 4000) {
            $(name+'CD0-img').hide()
            $(name+'CD1-img').show()
        } else if (delta_time <= 6000) {
            $(name+'CD1-img').hide()
            $(name+'CD2-img').show()
        } else if (delta_time <= 8000) {
            $(name+'CD2-img').hide()
            $(name+'CD3-img').show()
        } else {
            $(name+'CD3-img').hide()
            $('#empty-img').show()
        }
      }
      if (player['invis'] == true) {
        $('#invis_active-img').show()
      } else {
        $('#invis_active-img').hide()
      }
    }
  }
  
  module.exports = Cooldown