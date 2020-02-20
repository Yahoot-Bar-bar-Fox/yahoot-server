const { Room } = require('../models')

class RoomController {
  static createRoom(req, res, next) {
    let { name } = req.body
    Room.create({ name })
      .then(room => {
        res.status(201).json(room)
      })
      .catch(err => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Room.findAll({ name })
      .then(rooms => {
        res.status(200).json({ rooms })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = RoomController
