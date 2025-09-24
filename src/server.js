/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
  })

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