const typeDefs = `
  type User {
    id: ID!
    email: String!
    todos: [Todo!]!
  }

  type Query {
    info: String!
    allUsers: [User!]!
  }

  type Mutation {
    register(email: String!, password: String!): User!
  }

	type Todo {
		id: ID!
		content: String!
		title: String!
		author: User!
	}
`

module.exports = { typeDefs }
