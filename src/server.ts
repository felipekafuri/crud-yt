import './shared/typeorm'
import express from 'express'
import usersRouter from './modules/users/routes/users.routes'

const app = express()
app.use(express.json())
app.use(usersRouter)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
