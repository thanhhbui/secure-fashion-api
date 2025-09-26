import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories()
    res.status(StatusCodes.OK).json(categories)
  } catch (err) { next(err) }
}

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id)
    res.status(StatusCodes.OK).json(category)
  } catch (err) { next(err) }
}

const createCategory = async (req, res, next) => {
  try {
    const created = await categoryService.createCategory(req.body)
    res.status(StatusCodes.CREATED).json(created)
  } catch (err) { next(err) }
}

const updateCategory = async (req, res, next) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updated)
  } catch (err) { next(err) }
}

const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id)
    res.status(StatusCodes.OK).json({ message: 'Category deleted' })
  } catch (err) { next(err) }
}

export const categoryController = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
