import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

// Create Product
const createProduct = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(2000).optional(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).default(0),
    categoryId: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).optional()
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const productValidation = { createProduct }
