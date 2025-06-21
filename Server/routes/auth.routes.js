import { Router } from 'express'
import { registerWithGoogleController, userLoginController, userRegisterController } from '../controllers/auth.controller.js'
import { isAuthenticated } from '../middlewares/authentication.middleware.js'

const authRouter = Router()

authRouter.post('/register', userRegisterController)
authRouter.post('/login',userLoginController)
authRouter.post('/google', registerWithGoogleController)

authRouter.get('/profile', isAuthenticated, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message || 'Internal Server Error',
    });
  }
});


export default authRouter

