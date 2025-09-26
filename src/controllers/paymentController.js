import { StatusCodes } from 'http-status-codes'
import { paymentService } from '~/services/paymentService'

const processPayment = async (req, res, next) => {
  try {
    const result = await paymentService.processPayment(req.user.id, req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (err) { next(err) }
}

export const paymentController = { processPayment }
