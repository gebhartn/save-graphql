# Save GraphQL

With the advent of Prisma 2 it's no longer required to host a container for the query engine. Instead, the `@prisma/client` package exposes a "smart module" that learns from a combination of database introspection and migrations to generate CRUD methods against your database connection.

In order to use Prisma 2, the only prerequisite is a database connection URL which can be hosted locally or deployed to a hosting service. This example is using PostgreSQL but can be configured just as easily to work with SQLite 3 in a development environment.

This new approach to interfacing with your persistence layer simplified the start-up time for new teams looking to tackle GraphQL and supports [SDL first][1] (which is the example here) and [code first][2] approaches depending on the desires of your team.

#### Getting Started

This repository assumes that you have an active database connection to a postgresql database and also has some opinions about the username, password, and database name that the connection uses. All of these values are configured inside of *two* environment variables. One, located in the [prisma](/prisma) directory, has your connection info. [Another](.env) has environment variables for the cleanup script.

All of these are included in the repository and need to be added to the .gitignore if you want to use this as a starting point, but let's get started.

1. Clone this repository and `cd` into the root directory
2. Ensure the aforemenetioned environment variables match your local configuration
3. Run `source export.sh`*
4. Run `make clean` and follow the prompt to drop the existing schema and write a new one
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
  author    User     @relation(fields: [authorId], references: [id])
}

model User {
  createdAt DateTime @default(now())
  email     String   @unique
  id        Int      @default(autoincrement()) @id
  password  String
  todos     Todo[]
}
```





*NOTE: Windows users may not be able to use the Make utils, if that is the case you can just run the commands found inside of the [utils directory](./prisma/utils) and replace the environment values with hard coded values.

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
