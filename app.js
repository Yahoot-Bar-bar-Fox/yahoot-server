const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);
const errHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json)
app.use(cors())

app.use('/', router)
app.use(errHandler)

io.on('connection', function (socket) {
  console.log('a user connected');
});

server.listen(3000, function () {
  console.log('listening on *:3000');
});
