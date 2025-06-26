import {Router} from 'express'
import { isAuthenticated } from '../middlewares/authentication.middleware.js'
import { createConversationController, getConversationsController } from '../controllers/conversation.controller.js'

const conversationRouter = Router()
conversationRouter.post('/new', isAuthenticated, createConversationController)
conversationRouter.get('/all', isAuthenticated, getConversationsController)


export default conversationRouter