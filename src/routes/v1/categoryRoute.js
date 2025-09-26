import express from 'express'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'

const Router = express.Router()

Router.route('/')
  .get(categoryController.getCategories)
  .post(categoryValidation.createCategory, categoryController.createCategory)

Router.route('/:id')
  .get(categoryController.getCategoryById)
  .put(categoryValidation.createCategory, categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

export const categoryRoute = Router
