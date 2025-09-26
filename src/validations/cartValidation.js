import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const addToCart = async (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).default(1)
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const updateCartItem = async (req, res, next) => {
  const schema = Joi.object({
    quantity: Joi.number().integer().min(1).required()
  })
  try { await schema.validateAsync(req.body); next() }
  catch (e) { next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, e.message)) }
}

export const cartValidation = { addToCart, updateCartItem }
