const $ = require('jquery')
const Constants = require('lib/Constants')
class Table {
  constructor(container) {
    this.container = container
    this.rows = 11
    this.cols = 17
  }

  generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = $(`#talantTree`)
    let tblBody = ''

    for (let i = 0; i < this.rows; i++) {
      let row = '<tr>'
      let td = ''
      for (let j = 0; j < this.cols; j++) {
        let color = 'rgba(91, 91, 133, 0.69)'
        if (i==Math.floor(this.rows/2) && j==Math.floor(this.cols/2)) {
          color = 'rgba(0, 236, 194, 0.7)'
        }
        td = `<td onclick="learn(${j},${i})" style='background-color: ${color}'>
        <img src="img/empty.png" id='td-img'/></td>`;
        row+=td
      }
      row += '</tr>'
      // add the row to the end of the table body
      tblBody += row
    }
    tbl.html(tblBody)
    return tbl
  }

  update(show, updateTable=[false]) {
    if (updateTable[0]) {
      if (updateTable[1] == 'updateAll') {
        this.resetTable()
      } else {
        this.changeTd(updateTable[1], 'rgba(0, 236, 194, 0.7)')
      }
    }
    if (show) {
      $('#talantTree').show()
    } else {$('#talantTree').hide()}
  }

  resetTable() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let color = 'rgba(91, 91, 133, 0.69)'
        if (i==Math.floor(this.rows/2) && j==Math.floor(this.cols/2)) {
          color = 'rgba(0, 236, 194, 0.7)'
        }
        this.changeTd([i,j],color)
      }
    }
  }

  changeTd(xy,color) {
    const x = xy[0]
    const y = xy[1]
    const cels = $("td");
    const n = y * this.cols + x
    const el = cels[n]
    $(el).css('background-color', color);
  }

  pasteImages(adress) {
    const keys = Object.keys(adress)
    for (let i = 0; i < keys.length; i++) {

      const x = Math.floor(keys[i].split(',')[0])
      const y = Math.floor(keys[i].split(',')[1])
      const cels = $("td");
      const n = y * this.cols + x
      const el = cels[n]
      const pipe = adress[keys[i]]
      const path = "img/icons/"+pipe+".png"
      $(el).children().attr("src",path)
      $(el).children().attr("id",'td-img')
    }
  }
}
module.exports = Table