import { StatusCodes } from 'http-status-codes'
import { orderService } from '~/services/orderService'

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders(req.user.id, req.query)
    res.status(StatusCodes.OK).json(orders)
  } catch (err) { next(err) }
}

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user.id)
    res.status(StatusCodes.OK).json(order)
  } catch (err) { next(err) }
}

const createOrder = async (req, res, next) => {
  try {
    const created = await orderService.createOrder(req.user.id, req.body)
    res.status(StatusCodes.CREATED).json(created)
  } catch (err) { next(err) }
}

const updateOrderStatus = async (req, res, next) => {
  try {
    const updated = await orderService.updateOrderStatus(req.params.id, req.body.status)
    res.status(StatusCodes.OK).json(updated)
  } catch (err) { next(err) }
}

const cancelOrder = async (req, res, next) => {
  try {
    await orderService.cancelOrder(req.params.id, req.user.id)
    res.status(StatusCodes.OK).json({ message: 'Order cancelled' })
  } catch (err) { next(err) }
}

export const orderController = { getOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder }
