import * as express from 'express'
import * as bodyParser from 'body-parser'
import { getRooms } from './rooms/getRooms'
import { authenticateJWTMiddleware } from '../middlewares/authenticateJWTMiddleware'
import { createRoomRoute } from './rooms/createRoom'
import { editRoom } from './rooms/editRoom'
import { joinRoom } from './rooms/joinRoom'
import { inviteParticipants } from './invite/inviteParticipants'
import { createReminder } from './reminders/createReminder'
import { editReminder } from './reminders/editReminder'
import { deleteReminder } from './reminders/deleteReminder'
import { getReminders } from './reminders/getReminders'

const router = express.Router()
router.use(authenticateJWTMiddleware)
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/rooms/', getRooms)
router.post('/rooms/new', createRoomRoute)
router.patch('/rooms/:roomId', editRoom)
router.post('/rooms/:roomId/join', joinRoom)
router.post('/rooms/:roomId/inviteParticipants', inviteParticipants)
router.get('/rooms/:roomId/reminders/', getReminders)
router.post('/rooms/:roomId/reminders/', createReminder)
router.patch('/rooms/:roomId/reminders/:reminderId', editReminder)
router.delete('/rooms/:roomId/reminders/:reminderId', deleteReminder)

export default router
