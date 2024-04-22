const Constants = require('../lib/Constants')
const Util = require('../lib/Util')

class TalantTree {  
  constructor() {
    this.talantTree = {
      'collecter':{
        parents: [],
        childs: ['pipe', 'dash', 'invis'],
        access: true,
        address: "8,5"
      },
      'pipe':{
        parents: ['collecter'],
        childs: ['lazer', 'illusion'],
        access: false,
        address: "8,4"
      },
      'lazer':{
        parents: ['pipe'],
        childs: [],
        access: false,
        address: "7,3"
      },
      'illusion':{
        parents: ['pipe'],
        childs: [],
        access: false,
        address: "9,3"
      },
      'slime':{
        parents: ['lazer', 'illusion'],
        childs: ['stun'],
        access: false,
        address: "8,2"
      },
      'stun':{
        parents: ['slime'],
        childs: [],
        access: false,
        address: "7,1"
      },
      'dash':{
        parents: ['collecter'],
        childs: ['invis'],
        access: false,
        address: "8,6"
      },
      'invis':{
        parents: ['dash'],
        childs: [],
        access: false,
        address: "8,7"
      },
      'bomb':{
        parents: ['collecter'],
        childs: [],
        access: false,
        address: "7,5"
      },
    }

    this.address = {
      "8,5":'collecter',
      "8,4":'pipe',
      "7,3":'lazer',
      "9,3":'illusion',
      "8,2":'slime',
      "7,1":'stun',
      "8,6":'dash',
      "8,7":'invis',
      "7,5":'bomb'
    }
  }

  getImgs() {
    return this.address
  }

  unlock(address) {
    if (address != undefined && address.length != 0) {
      const name = this.getName(address)
      if (name != undefined) {
        let ret = this.unlockIfCan(name)
        return ret
      }
    }
  }

  getName(address) {
    return this.address[address.toString()]
  }

  unlockIfCan(spellName) {
    const spell = this.talantTree[spellName]
    if (spell['access'] == false) {
      const parents = spell['parents']
      for (const parent of parents) {
        if (this.talantTree[parent]['access']==false) {
          return false
        }
      }
      this.talantTree[spellName]['access']=true
      return true
    }
    return false
  }

  canDash() {
    return this.talantTree['dash']['access']
  }
  canBomb() {
    return this.talantTree['bomb']['access']
  }
  canInvis() {
    return this.talantTree['invis']['access']
  }

}

module.exports = TalantTree
