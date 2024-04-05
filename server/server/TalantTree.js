const Constants = require('../lib/Constants')
const Util = require('../lib/Util')

class TalantTree {
  constructor() {
    this.talantTree = [{
      collecter:[{
        pipe:[{
          lazer:[{}, false, 20],
          illusion:[{}, false, 20],
        }, false, 5],

        dash:[{}, false, 10],
        invis:[{}, false, 10]
        }]
      }, true, 0]
  }

  unlock(spellName, TT=this.talantTree[0]) {
    const vals = Object.values(TT)[0]
    try {
      if (vals.length==0) {return [false]}
    } catch (e) {return [false]}
    // console.log(TT)
    vals.forEach(element => {
      if (element == spellName) {return true, parent}
      const ret = this.unlock(spellName, element)
      if (ret[0] == true) {return [true, ret[1]]}
      const parent = element
      // this.unlock(spellName)
      // console.log(element)
    });
    return [false]
  }
}

module.exports = TalantTree
