// v1
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'
import { authRoute } from './authRoute'
import { cartRoute } from './cartRoute'
import { productRoute } from './productRoute'
import { categoryRoute } from './categoryRoute'
import { orderRoute } from './orderRoute'
import { paymentRoute } from './paymentRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

Router.use('/auth', authRoute)
Router.use('/users', userRoute)
Router.use('/categories', categoryRoute)
Router.use('/products', productRoute)
Router.use('/orders', orderRoute)
Router.use('/cart', cartRoute)
Router.use('/payment', paymentRoute)

export const APIs_V1 = Router