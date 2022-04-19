# GraphQL test project with Prisma ORM

Install modules and generate Prisma client based on `prisma/schema.prisma`.

```
npm install && npx prisma generate
```

To view the database state, run:

```
npx prisma studio
```


## GraphQL Cheatsheet

### Query all users:
````
{
  users {
    id
    email
    name
  }
}

````

### Query user by id:
````
{
  user(id: 2) {
    id
    email
    name
  }
}
````

### Query all tasks:
````
{
  tasks {
    id
    title
    authorId
    completed
  }
}

````

### Query specific user and it's tasks:
````
{
  user(id: 2) {
    id
    email
    name
    tasks {
      id
      completed
      title
    }
  }
}
````

### Mutation add user:
````
mutation {
  createUser(email: "mika@lakanen.fi", name:"Mika Lakanen") {
    id
    email
    name
  }
}
````

### Mutation add task:
````
mutation {
  createTask(title: "Task2", authorId: 2) {
    id
    title
  }
}
````

### Mutation edit user:
````
mutation {
  updateUser(id: 2, email: "ville2@com") {
    id
    email
    name
  }
}
````

### Mutation delete user:
````
mutation {
  deleteUser(id: 2) {
    id
    email
    name
  }
}
````