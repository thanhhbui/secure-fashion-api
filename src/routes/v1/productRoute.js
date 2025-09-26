import express from 'express'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'

const Router = express.Router()

Router.route('/')
  .get(productController.getProducts)
  .post(productValidation.createProduct, productController.createProduct)

Router.route('/:id')
  .get(productController.getProductById)
  .put(productValidation.createProduct, productController.updateProduct)
  .delete(productController.deleteProduct)

export const productRoute = Router
