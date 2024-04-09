const Constants = require('../lib/Constants')
const Util = require('../lib/Util')

class TalantTree {
  constructor() {
    this.talantTree = {
      'collecter':{
        parent: 'self',
        childs: ['pipe', 'dash', 'invis'],
        access: true,
        address: "7,5"
      },
      'pipe':{
        parent: 'collecter',
        childs: ['lazer', 'illusion'],
        access: false,
        address: "7,4"
      },
      'lazer':{
        parent: 'pipe',
        childs: [],
        access: false,
        address: "6,3"
      },
      'illusion':{
        parent: 'pipe',
        childs: [],
        access: false,
        address: "8,3"
      },
      'dash':{
        parent: 'collecter',
        childs: [],
        access: false,
        address: "7,6"
      },
      'invis':{
        parent: 'collecter',
        childs: [],
        access: false,
        address: "7,7"
      }
    }
    // this.talantTree = [{
    //   collecter:[{
    //     pipe:[{
    //       lazer:[{}, false, 20],
    //       illusion:[{}, false, 20],
    //     }, false, 5],

    //     dash:[{}, false, 10],
    //     invis:[{}, false, 10]
    //     }, true, 0]
    //   }]
    this.address = {
      "7,5":'collecter',
      "7,4":'pipe',
      "6,3":'lazer',
      "8,3":'illusion',
      "7,6":'dash',
      "7,7":'invis'
    }
  }

  unlock(address) {
    if (address != undefined && address.length != 0) {
      // console.log(address)
      const name = this.getName(address)
      if (name != undefined) {
        let ret = this.unlockIfCan(name)
        return ret
      }
    }
    // if (ret[0] == false) {
    //   return false
    // } else {
    //   return true
    // }
  }

  getName(address) {
    return this.address[address.toString()]
  }

  unlockIfCan(spellName) {
    const spell = this.talantTree[spellName]
    // console.log(spellName)
    // console.log(spell['access'])
    if (spell['access'] == false) {
      if (this.talantTree[spell['parent']]['access'] == true) {
        this.talantTree[spellName]['access'] = true
        return true
      }
    }
    return false
  }

  canDash() {
    return this.talantTree['dash']['access']
  }
  canInvis() {
    return this.talantTree['invis']['access']
  }

}

module.exports = TalantTree
