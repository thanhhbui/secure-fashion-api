import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

// Create Order
const createOrder = async (req, res, next) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required()
        })
      )
      .min(1)
      .required(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      postalCode: Joi.string().required()
    }).required(),
    paymentMethod: Joi.string().valid('cod', 'card', 'paypal').required()
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const updateOrderStatus = async (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'paid', 'shipped', 'completed', 'cancelled').required()
  })
  try { await schema.validateAsync(req.body); next() }
  catch (e) { next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, e.message)) }
}

export const orderValidation = { createOrder, updateOrderStatus }
