import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as database from './config/database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './typeDefs/index.typeDefs'
import { resolvers } from './resolvers'

const startServer = async () => {
  dotenv.config()
  database.connect()
  const app: Express = express()
  const port: string | number = process.env.PORT || 3000

  //graphql

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app: app,
    path: '/graphql',
  })
  app.listen(port, () => {
    console.log('lắng nghe thành công ')
  })
}

startServer()
