import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query)
    res.status(StatusCodes.OK).json(products)
  } catch (err) { next(err) }
}

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id)
    res.status(StatusCodes.OK).json(product)
  } catch (err) { next(err) }
}

const createProduct = async (req, res, next) => {
  try {
    const created = await productService.createProduct(req.body)
    res.status(StatusCodes.CREATED).json(created)
  } catch (err) { next(err) }
}

const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updated)
  } catch (err) { next(err) }
}

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id)
    res.status(StatusCodes.OK).json({ message: 'Product deleted' })
  } catch (err) { next(err) }
}

export const productController = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
