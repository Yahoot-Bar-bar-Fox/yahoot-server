const router = require('express').Router()
const RoomController = require('../controllers/roomController')

router.post('/', RoomController.createRoom)
router.get('/', RoomController.findAll)

module.exports = router
