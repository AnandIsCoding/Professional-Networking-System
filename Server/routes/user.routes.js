import {Router} from 'express'
import { isAuthenticated } from '../middlewares/authentication.middleware.js'
import { acceptFriendRequestController, getMyFriendsController, getMyPendingFriendRequests, removeFriendController, searchUserController, sendFriendRequestController } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/search',isAuthenticated, searchUserController)
userRouter.post('/sendfriendrequest', isAuthenticated, sendFriendRequestController)
userRouter.post('/acceptfriendrequest', isAuthenticated, acceptFriendRequestController)
userRouter.get('/myfriends', isAuthenticated, getMyFriendsController)
userRouter.get('/mypendingfriendrequests', isAuthenticated, getMyPendingFriendRequests)
userRouter.delete('/removefriend/:friendId', isAuthenticated, removeFriendController)

export default userRouter