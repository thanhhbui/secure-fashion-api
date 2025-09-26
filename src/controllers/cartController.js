import { StatusCodes } from 'http-status-codes'
import { cartService } from '~/services/cartService'

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id)
    res.status(StatusCodes.OK).json(cart)
  } catch (err) { next(err) }
}

const addToCart = async (req, res, next) => {
  try {
    const updatedCart = await cartService.addToCart(req.user.id, req.body)
    res.status(StatusCodes.OK).json(updatedCart)
  } catch (err) { next(err) }
}

const updateCartItem = async (req, res, next) => {
  try {
    const updatedCart = await cartService.updateCartItem(req.user.id, req.params.productId, req.body.quantity)
    res.status(StatusCodes.OK).json(updatedCart)
  } catch (err) { next(err) }
}

const removeCartItem = async (req, res, next) => {
  try {
    const updatedCart = await cartService.removeCartItem(req.user.id, req.params.productId)
    res.status(StatusCodes.OK).json(updatedCart)
  } catch (err) { next(err) }
}

const clearCart = async (req, res, next) => {
  try {
    await cartService.clearCart(req.user.id)
    res.status(StatusCodes.OK).json({ message: 'Cart cleared' })
  } catch (err) { next(err) }
}

export const cartController = { getCart, addToCart, updateCartItem, removeCartItem, clearCart }
