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
        }, true, 0]
      }]
  }

  unlock(spellName, TT=this.talantTree[0], parent='collecter') {
    try {
      if (Object.keys(TT).length==0) {return [false]}
    } catch (e) {return [false]}
    const keys = Object.keys(TT)
    try {
      if (keys.length==0) {return [false]}
    } catch (e) {return [false]}

    for (const element of keys) {
      // console.log(element)
      if (element == spellName) {
        return [TT[element][1], parent, true]
      }
      const ret = this.unlock(spellName, TT[element][0], element)
      if (ret[2] == true) {return [TT[element][1], ret[1], true]}
    };
    return [false]
  }
}

module.exports = TalantTree
