import express from 'express'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const Router = express.Router()

// user profile
Router.route('/me')
  .get(userController.getProfile)
  .put(userValidation.updateProfile, userController.updateProfile)

// admin features
Router.route('/')
  .get(userController.getAllUsers)

Router.route('/:id')
  .get(userController.getUserById)
  .patch(userValidation.updateUserByAdmin, userController.updateUserByAdmin)
  .delete(userController.deleteUser)

export const userRoute = Router
