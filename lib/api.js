import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import fetch from 'node-fetch'

import { graphqlHost } from '../server/config/config.json'
const { host, port } = graphqlHost

export * from './queries'

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations }) =>
          console.log(`[GraphQL error]: Message: ${message} at location ${locations}`))
      }

      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      fetch,
      uri: `http${ process.env.NODE_ENV === 'production' ? 's' : '' }://${host}:${port}/`,
    }),
  ]),
  cache: new InMemoryCache(),
})

const request = query => client.query({ query })

export default request
