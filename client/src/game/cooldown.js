const $ = require('jquery')
const Constants = require('lib/Constants')

class Cooldown {
    constructor(container) {
      this.container = container
    }

    static create(containerElementID) {
      return new Cooldown(document.getElementById(containerElementID))
    }

    update(pl=[]) {
      const player = pl[0]
      const startTimes = Constants.START_SPELL_TIMES
      const spells = Constants.SPELLS
      for (let i = 0; i < startTimes.length; i++) {
        const delta_time = player['lastUpdateTime']-player[startTimes[i]]
        if (delta_time <= 8000) {
          if (spells[i]=='dash') {
            $('#dash_empty-img').hide()
          }
          $('#'+spells[i]+'-gif').show()
        } else {
          if (spells[i]=='dash') {
            // debugger
            $('#dash_empty-img').show()
          }
          $('#'+spells[i]+'-gif').hide() 
        }
      }
      if (player['invis'] == true) {
        $('#invis_active-img').show()
        $('#invis_empty-img').hide()
      } else {
        $('#invis_active-img').hide()
        $('#invis_empty-img').show()
      }
    }
  }
  
  module.exports = Cooldown