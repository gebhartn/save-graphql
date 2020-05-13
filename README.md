# Save GraphQL

With the advent of Prisma 2 it's no longer required to host a container for the query engine. Instead, the `@prisma/client` package exposes a "smart module" that learns from a combination of database introspection and migrations to generate CRUD methods against your database connection.

In order to use Prisma 2, the only prerequisite is a database connection URL which can be hosted locally or deployed to a hosting service. This example is using PostgreSQL but can be configured just as easily to work with SQLite 3 in a development environment.

This new approach to interfacing with your persistence layer simplified the start-up time for new teams looking to tackle GraphQL and supports SDL first (which is the example here) and [code first][2] approaches depending on the desires of your team.

### Getting Started

This repository assumes that you have an active database connection to a postgresql database and also has some opinions about the username, password, and database name that the connection uses. All of these values are configured inside of *two* environment variables. One, located in the [prisma](/prisma/.env) directory, has your connection info. [Another](.env) has environment variables for the cleanup script.

All of these are included in the repository and need to be added to the .gitignore if you want to use this as a starting point, but let's get started.

1. Clone this repository and `cd` into the root directory
2. Ensure the aforemenetioned environment variables match your local configuration
3. Run `source export.sh`*
4. Run `make clean` and follow the prompt to drop the existing schema and write a new one. By default, your postgres password is `postgres`*

*NOTE: Windows users may not be able to use the Make utils, if that is the case you can just run the commands found inside of the [utils directory](./prisma/utils/clean.sh) and replace the environment values with hard coded values.

5. Run `yarn` to install dependencies
6. Run `yarn introspect` to introspect your schema

It's at this step that we need to make some changes to our `schema.prisma` file. The introspection tools generates a data model for us, but in order to make it a bit more idiomatic we need to change some values:


Currently, our data model looks like this:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  authorId  Int
  content   String
  createdAt DateTime @default(now())
  id        Int      @default(autoincrement()) @id
  title     String
  User      User     @relation(fields: [authorId], references: [id])
}

model User {
  createdAt DateTime @default(now())
  email     String   @unique
  id        Int      @default(autoincrement()) @id
  password  String
  Todo      Todo[]
}
```

Notice that we have two relational fields that have generated names which don't really describe the fields they are returning. Let's instead, change it to this:

```diff
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  authorId  Int
  content   String
  createdAt DateTime @default(now())
  id        Int      @default(autoincrement()) @id
  title     String
-  User      User     @relation(fields: [authorId], references: [id])
+  author    User     @relation(fields: [authorId], references: [id])
}

model User {
  createdAt DateTime @default(now())
  email     String   @unique
  id        Int      @default(autoincrement()) @id
  password  String
-  Todo      Todo[]
+  todos     Todo[]
}
```

7. Run `yarn generate` to generate the client smart module
8. Run `yarn start:dev` to fire up the server
9. Run some test queries at `localhost:4000`

```graphql
mutation register{
  register(email: "Nicholas@Labs.com", password: "DontHackMe") {
    id
    email
  }
}

query allUsers {
  allUsers {
    id
    email
    todos {
      id
    }
  }
}

query info {
  info
}
```

### What's happening

#### Schema

Inside of the [prisma](./prisma) directory you'll find a utils file with a [schema.sql](/prisma/utils/schema.sql) file inside of it. This is what defines the schema for our database.

#### utils

Additionally you will find some utils to drop and create the schema for your database. These are simply tools to help get started, and can be done manually from the command line.

To run the commands manually:

```bash
psql -h HOST -d DATABASE -U USER -f SCHEMA.sql
```

Where `HOST`, `DATABASE`, `USER` and `SCHEMA` are placeholders for your own credentials and file name.

### Code

Once we have introspected our datamodel and generated our Prisma client, we pass the client through the Apollo Server instance on context. This allows all of our resolvers to access the prisma client and use the CRUD operations against our own persistence layer.

Additionally, inside of the [schema](./src/schema) directory, there is a `typeDefs.js` file that describes our GraphQL schema. These are the types returned by our resolvers and act as the first line of defense against potentially returning sensitive information (such as passwords) from our database.

There are some gotchas here. As your datamodel grows in complexity, it becomes increasingly prone to error as you are developing your application. Tools like the [GraphQL code generator](https://graphql-code-generator.com/) aim to alleviate this room for error, and should be considered as your app grows in complexity.

#### Resolvers

Resolvers, simply put, are functions which describe which information is returned for a compound field, mutation, query, or subscription. Resolvers are not required for fields which return scalar values, but beyond that there is a one-to-one relation for fields and the values returned for a given field.

This concept mirrors the `include` directive commonly found in REST architecture. In order to resolve a compound field for a given type, you must first implement a resolver such that the resulting value of that function matches the expected type as described in the GraphQL schema.

For example, if a given Query is described to return type `User`, then your resolver for the same Query must also return the same data type.

Each resolvers receives four arguments: parent, arguments, context, and info. If you recall previously, you'll know that the `prisma client` is passed into all of your resolvers on the context object, and thus each of your resolvers can access the [CRUD operations](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud/) exposed by the prisma client.

[2]: https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3
