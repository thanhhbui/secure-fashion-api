import express from 'express'
import { orderController } from '~/controllers/orderController'
import { orderValidation } from '~/validations/orderValidation'

const Router = express.Router()

Router.route('/')
  .get(orderController.getOrders)
  .post(orderValidation.createOrder, orderController.createOrder)

Router.route('/:id')
  .get(orderController.getOrderById)
  .put(orderController.updateOrderStatus)
  .delete(orderController.cancelOrder)

export const orderRoute = Router
