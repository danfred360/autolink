import { buildSchema } from 'graphql';

export const Schema = buildSchema(`
  type User {
    id: Int
    name: String
    email: String
  }

  type Car {
    id: Int
    ownerId: Int
    make: String
    model: String
    year: Int
    vin: String
  }

  type MaintenanceRecord {
    id: Int
    carId: Int
    date: String
    odometer: Int
    type: String
    description: String
    cost: Float
  }

  type Query {
    users: [User]
    user(id: Int!): User
    cars(userId: Int!): [Car]
    maintenanceRecords(carId: Int!): [MaintenanceRecord]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): Boolean
  }
`);