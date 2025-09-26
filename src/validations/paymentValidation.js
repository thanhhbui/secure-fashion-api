import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

// Process Payment
const processPayment = async (req, res, next) => {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    method: Joi.string().valid('card', 'paypal', 'cod').required(),
    token: Joi.string().optional() // token từ cổng thanh toán (nếu có)
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const paymentValidation = { processPayment }
