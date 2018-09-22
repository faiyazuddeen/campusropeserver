import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import {createDummyUsers} from './services/seed'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

const mongooseOptions = {
  useNewUrlParser: true
}
mongoose.set('useCreateIndex', true)
mongoose.connect(mongo.uri, mongooseOptions)
mongoose.Promise = Promise

createDummyUsers();

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
