import { gql } from 'apollo-server-express'
export const typeDefsUser = gql`
  type User {
    id: ID
    fullName: String
    email: String
    avatar: String
    token: String
    phone: String
    code: Int
    message: String
  }

  input RegisterUserInput {
    fullName: String
    email: String
    password: String
    phone: String
    avatar: String
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
  }
`
