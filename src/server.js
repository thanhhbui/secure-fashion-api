/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // cho phép req.body json data
  app.use(express.json())

  // use api v1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas')
  })
}

// kết nối đến DB và chỉ bắt đầu server khi đã kết nối được database
(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    CONNECT_DB()
    console.log('2. Connected to MongoDB!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()