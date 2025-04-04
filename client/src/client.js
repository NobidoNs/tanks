/**
 * Client side script that initializes the game. This should be the only script
 * that depends on JQuery.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

require('/less/styles.less')

const $ = require('jquery')
const io = require('socket.io-client')
// const { io } = require("socket.io-client");

const Chat = require('./game/Chat')
const Game = require('./game/Game')
const ServerUrl = require('../config.json')
let ready = false
let game = ''

$(document).ready(() => {
  const socket = io(ServerUrl['serverUrl'])
  game = Game.create(socket, 'canvas', 'leaderboard', 'talantTree')
  Chat.create(socket, 'chat-display', 'chat-input')
  ready = true

  $('#name-input').focus()

  // const name = 'tim'
  // console.log('new-pl')
  // socket.emit('new-player', { name }, () => {
  //   $('#name-prompt-overlay').remove()
  //   $('#canvas').focus()
  //   game.run()
  // })

  /**
   * Function to send the player name to the server.
   * @return {false}
   */
  const sendName = () => {
    const name = $('#name-input').val()
    if (name && name.length < 20) {
      $('#name-prompt-container').empty()
      $('#name-prompt-container').append(
        $('<span>').addClass('fa fa-2x fa-spinner fa-pulse'))
      console.log('new-pl')
      socket.emit('new-player', { name }, () => {
        $('#name-prompt-overlay').remove()
        $('#canvas').focus()
        game.run()
      })
    } else {
      window.alert('Your name cannot be blank or over 20 characters.')
    }
    return false
  }
  $('#name-form').submit(sendName)
  $('#name-submit').click(sendName)

  window.learn = function(row,col) {
    game.learn(row,col)
  }
})
