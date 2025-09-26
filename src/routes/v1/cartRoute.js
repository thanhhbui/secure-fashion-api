import express from 'express'
import { cartController } from '~/controllers/cartController'
import { cartValidation } from '~/validations/cartValidation'

const Router = express.Router()

Router.route('/')
  .get(cartController.getCart)
  .post(cartValidation.addToCart, cartController.addToCart)
  .delete(cartController.clearCart)

Router.route('/:productId')
  .patch(cartValidation.addToCart, cartController.updateCartItem)
  .delete(cartController.removeCartItem)

export const cartRoute = Router
