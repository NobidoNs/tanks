const $ = require('jquery')
class Table {
  constructor(container) {
    this.container = container
    this.rows = 11
    this.cols = 15
  }

  generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = $(`#talantTree`)
    let tblBody = ''

    for (let i = 0; i < this.rows; i++) {
      let row = '<tr>'
      let td = ''
      for (let j = 0; j < this.cols; j++) {
        td = `<td onclick="learn(${j},${i})"></td>`;
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
    if (updateTable[0]) {this.changeCl(updateTable[1], 'rgba(0, 236, 194, 0.7)')}
    if (show) {
      $('#talantTree').show()
    } else {$('#talantTree').hide()}
  }

  changeCl(xy,color) {
    const x = xy[0]
    const y = xy[1]
    const cels = $("td");
    const n = y * this.cols + x
    const el = cels[n]
    console.log(n)
    $(el).css('background-color', 'blue');
  }
}
module.exports = Table