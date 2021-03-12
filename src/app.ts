import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import usersRouter from './modules/users/routes/users.routes'
import AppError from './shared/errors/AppError'
import createConnection from './shared/typeorm'

createConnection()
const app = express()
app.use(usersRouter)

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.error(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

export { app }
