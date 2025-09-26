import express from 'express'
import { authController } from '~/controllers/authController'
import { authValidation } from '~/validations/authValidation'

const Router = express.Router()

Router.route('/register')
  .post(authValidation.register, authController.register)

Router.route('/login')
  .post(authValidation.login, authController.login)

// sử dụng JWT sau
// Router.route('/refresh')
//   .post(authValidation.refreshToken, authController.refreshToken)

Router.route('/logout')
  .post(authController.logout)

Router.route('/change-password')
  .post(authValidation.changePassword, authController.changePassword)

Router.route('/me')
  .get(authController.getMe)

export const authRoute = Router
