// validation data
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const updateProfile = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50),
    phone: Joi.string().pattern(/^[0-9+\-\s]{8,15}$/).allow(null, ''),
    avatar: Joi.string().uri().optional(),
    address: Joi.array().items(
      Joi.object({
        street: Joi.string().max(255),
        city: Joi.string().max(100),
        country: Joi.string().max(100),
        postalCode: Joi.string().max(20),
        isDefault: Joi.boolean()
      })
    )
  })

  try {
    // console.log(req.body)
    await schema.validateAsync(req.body, { abortEarly: false })
    next() // nhảy req tiếp
  } catch (error) {
    // nếu next có đầu vào thì hiểu là có error nhảy sang xử lý error
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const updateUserByAdmin = async (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string().valid('customer', 'admin'),
    isActive: Joi.boolean()
  })
  try { await schema.validateAsync(req.body); next() }
  catch (e) { next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, e.message)) }
}

export const userValidation = {
  updateProfile,
  updateUserByAdmin
}