const $ = require('jquery')
class Table {
  constructor(container) {
    this.container = container
  }

  static generateTable() {
    // creates a <table> element and a <tbody> element
    const tbl = $(`#talantTree`)
    let tblBody = ''
    // creating all cells
    for (let i = 0; i < 10; i++) {
      // creates a table row
      // const row = document.createElement("tr");
      let row = '<tr>'
      let td = ''
      for (let j = 0; j < 10; j++) {
        // const cell = document.createElement("td");
        // td.setAttribute()
        // console.log(cell)

        td = `<td onclick="learn(${j},${i})"></td>`;

        // const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
        // const onclick = document.
        // cell.appendChild(cellText);
        // row.append(cell);
        row+=td
      }
      row += '</tr>'
      // add the row to the end of the table body
      // tblBody.append(row);
      tblBody += row
    }
    // // put the <tbody> in the <table>
    // tbl.append(tblBody);
    // // appends <table> into <body>
    // document.body.append(tbl);
    // // sets the border attribute of tbl to '2'
    // tbl.setAttribute("border", "2");
    // console.log(tbl)
    tbl.html(tblBody)
    return tbl
  }

  static update(show) {
    if (show) {
      $('#talantTree').show()
    } else {$('#talantTree').hide()}
  }
}
module.exports = Table