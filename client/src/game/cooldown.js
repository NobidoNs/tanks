const $ = require('jquery')
const Constants = require('lib/Constants')

class Cooldown {
    constructor(container) {
      this.container = container
    }

    static create(containerElementID) {
      return new Cooldown(document.getElementById(containerElementID))
    }

    update(player) {
      if (!player) { return }
      // Update spells/abilities container to include only unlocked ones
      try {
        const talents = player.talants && player.talants.talantTree ? player.talants.talantTree : {}
        const container = $('#spels-container')
        if (container && Object.keys(talents).length > 0) {
          container.empty()
          // Spells we recognize for icons
          const spellKeys = ['dash', 'invis', 'bomb', 'scaner']
          const gunKeys = Object.keys(Constants.GUN_TYPES)
          const unlockedSpells = spellKeys.filter(key => talents[key] && talents[key].access)
          const unlockedGuns = gunKeys.filter(key => talents[key] && talents[key].access)
          const addIcon = (name) => {
            container.append(`<img src="img/icons/${name}.png" id='spell-img'/>`)
          }
          unlockedSpells.forEach(addIcon)
          unlockedGuns.forEach(addIcon)
        }
      } catch (e) { /* no-op */ }

      // Cooldown indicators
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