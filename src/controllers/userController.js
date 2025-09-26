import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getProfile(req.user.id)
    res.status(StatusCodes.OK).json(profile)
  } catch (err) { next(err) }
}

const updateProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateProfile(req.user.id, req.body)
    res.status(StatusCodes.OK).json(updated)
  } catch (err) { next(err) }
}

// Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.query)
    res.status(StatusCodes.OK).json(users)
  } catch (err) { next(err) }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.status(StatusCodes.OK).json(user)
  } catch (err) { next(err) }
}

const updateUserByAdmin = async (req, res, next) => {
  try {
    const updated = await userService.updateUserByAdmin(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updated)
  } catch (err) { next(err) }
}

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id)
    res.status(StatusCodes.OK).json({ message: 'User deleted successfully' })
  } catch (err) { next(err) }
}

export const userController = { getProfile, updateProfile, getAllUsers, getUserById, updateUserByAdmin, deleteUser }