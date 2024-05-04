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
        access: false,
        address: "8,4"
      },
      'lazer':{
        parents: ['pipe'],
        access: false,
        address: "7,3"
      },
      'illusion':{
        parents: ['pipe'],
        access: false,
        address: "9,3"
      },
      'slime':{
        parents: ['lazer', 'illusion'],
        access: false,
        address: "8,2"
      },
      'phis_stun':{
        parents: ['slime'],
        access: false,
        address: "7,1"
      },
      'mag_stun':{
        parents: ['slime'],
        access: false,
        address: "9,1"
      },
      'dash':{
        parents: ['collecter'],
        access: false,
        address: "8,6"
      },
      'invis':{
        parents: ['dash'],
        access: false,
        address: "8,7"
      },
      'bomb':{
        parents: ['collecter'],
        access: false,
        address: "9,5"
      },
      'blaster':{
        parents: ['bomb', 'illusion'],
        access: false,
        address: "10,4"
      },
      'scaner':{
        parents: ['collecter'],
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
      "7,1":'phis_stun',
      "9,1":'mag_stun',
      "8,6":'dash',
      "8,7":'invis',
      "9,5":'bomb',
      "7,5":'scaner',
      "10,4":'blaster'
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
        if (address == this.talantTree['scaner']['address']) {
          return 'scaner'
        }
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
