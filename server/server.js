/**
 * This is the server app script that is run on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PORT = process.env.PORT || 5000
const FRAME_RATE = 1000 / 60
const CHAT_TAG = '[Tank Anarchy]'
//
// Dependencies. Зависимости
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const socketIO = require('socket.io')

const Game = require('./server/Game')

const Constants = require('./lib/Constants')

// Initialization. Инициализация
const app = express()
const server = http.Server(app)
const io = socketIO(server)
const game = new Game()
// console.log(io)
app.set('port', PORT)

app.use(morgan('dev'))
app.use('/client', express.static(path.join(__dirname, '/client')))
app.use('/img', express.static(path.join(__dirname, '/img')))
// app.use('/dist', express.static(path.join(__dirname, '/dist')))

// Routing Маршрутизация
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'views/index.html'))
})

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything runs asynchronously with
 * the game loop. 
 * Обработчик ввода на стороне сервера изменяет состояние игроков
 *  и игры на основе получаемого ввода. Все работает асинхронно с игровым циклом
 */
io.on('connection', socket => {
  console.log('connection start')
  socket.on(Constants.SOCKET_NEW_PLAYER, (data, callback) => {
    game.addNewPlayer(data.name, socket)
    io.sockets.emit(Constants.SOCKET_CHAT_SERVER_CLIENT, {
      name: CHAT_TAG,
      message: `${data.name} has joined the game.`,
      isNotification: true
    })
    callback()
  })

  socket.on(Constants.SOCKET_PLAYER_ACTION, data => {
    game.updatePlayerOnInput(socket.id, data)
  })

  socket.on(Constants.SOCKET_CHAT_CLIENT_SERVER, data => {
    io.sockets.emit(Constants.SOCKET_CHAT_SERVER_CLIENT, {
      name: game.getPlayerNameBySocketId(socket.id),
      message: data
    })
  })

  socket.on(Constants.SOCKET_DISCONNECT, () => {
    const name = game.removePlayer(socket.id)
    io.sockets.emit(Constants.SOCKET_CHAT_SERVER_CLIENT, {
      name: CHAT_TAG,
      message: ` ${name} has left the game.`,
      isNotification: true
    })
  })
})

/**
 * Server side game loop, runs at 60Hz and sends out update packets to all
 * clients every update.
 * Игровой цикл на стороне сервера, работает на частоте 60 Гц и отправляет 
 * пакеты обновлений всем клиентам при каждом обновлении.
 */
setInterval(() => {
  game.update()
  game.sendState()
}, FRAME_RATE)

// Starts the server.
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting server on port ${PORT}`)
})
