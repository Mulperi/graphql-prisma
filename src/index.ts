import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { context } from './context'
import { schema } from './schema';
import cors from 'cors'

const app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');