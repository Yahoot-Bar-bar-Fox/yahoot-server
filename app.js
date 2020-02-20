const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);
const errHandler = require('./middlewares/errorHandler')
// const router = require('./routes')
const { Room } = require('./models')

app.use(express.urlencoded({ extended: false }))
app.use(express.json)
app.use(cors())

app.use('/', router)
app.use(errHandler)

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('addRooms', (payload) => {
      let dataRoom = {
          name: payload.name,
          totalPlayer: payload.totalPlayer
      }
      Room
        .create(dataRoom)
        .then(room => {
            socket.join(room.id, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success adding room')
                    io.emit('roomCreated', room)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
  })

  socket.on('fetchRooms', () => {
      Rooms
        .findAll()
        .then(rooms => {
            socket.emit('fetchRooms', rooms)
        })
        .catch(err => {
            console.log(err)
        })
  })
});

server.listen(3000, function () {
  console.log('listening on *:3000');
});
