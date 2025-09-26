import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(StatusCodes.CREATED).json(user)
  } catch (err) { next(err) }
}

// token xử lý JWT sau
const login = async (req, res, next) => {
  try {
    const tokens = await authService.login(req.body)
    res.status(StatusCodes.OK).json(tokens)
  } catch (err) { next(err) }
}

const refreshToken = async (req, res, next) => {
  try {
    const newAccessToken = await authService.refreshToken(req.body.refreshToken)
    res.status(StatusCodes.OK).json(newAccessToken)
  } catch (err) { next(err) }
}

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user)
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' })
  } catch (err) { next(err) }
}

const changePassword = async (req, res, next) => {
  try {
    await authService.changePassword(req.user.id, req.body)
    res.status(StatusCodes.OK).json({ message: 'Password changed successfully' })
  } catch (err) { next(err) }
}

const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getMe(req.user.id)
    res.status(StatusCodes.OK).json(profile)
  } catch (err) { next(err) }
}

export const authController = { register, login, refreshToken, logout, changePassword, getMe }
