import express from 'express'
import { paymentController } from '~/controllers/paymentController'
import { paymentValidation } from '~/validations/paymentValidation'

const Router = express.Router()

Router.route('/')
  .post(paymentValidation.processPayment, paymentController.processPayment)

export const paymentRoute = Router
