import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from 'apollo-boost'
import { graphqlHost } from '../../server/config/config.json'

const { host, port } = graphqlHost

const httpLink = new HttpLink({
  uri: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${host}:${port}/graphql`,
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')

  operation.setContext({
    headers: {
      authorization: token || '',
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
