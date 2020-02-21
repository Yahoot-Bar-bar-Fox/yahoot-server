const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors')
const errHandler = require('./middlewares/errorHandler')
// const router = require('./routes')
const { Room } = require('./models')

const fs = require('fs')
const questions = JSON.parse(fs.readFileSync('question.json', 'utf8'))
// get Random question from question.json,use this function to fetch random question
const getRandomQuestions = require('./helpers/getQuestions')

app.use(express.urlencoded({ extended: false }))
app.use(express.json)
app.use(cors())

// app.use('/', router)
app.use(errHandler)

io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('addRooms', (payload) => {

        let dataRoom = {
            name: payload.roomName,
            totalPlayer: 0
        }

        Room.create(dataRoom)
            .then(room => {
                console.log('success adding room')
                io.emit('roomCreated', room)
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('fetchRooms', () => {
        Room
            .findAll()
            .then(rooms => {
                socket.emit('showRooms', rooms)
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('joinRoom', (payload) => {
        
        socket.join(payload.id, (err) => {
            Room
                .findByPk(payload.id)
                .then(room => {
                    console.log(room);
                    
                    let newTotalPlayer = room.totalPlayer + 1
                    return Room.update({ totalPlayer: newTotalPlayer }, {
                        where: {
                            id: payload.id
                        }
                    })
                })
                .then(room => {
                    io.to(payload.id).emit('someoneJoined', payload.username)
                })
                .catch(err => {
                    console.log(err)
                })

        })
    })
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});
