import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { get } from 'lodash'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import fetch from 'node-fetch'
import gql from 'graphql-tag'
import ical from 'ical-generator'

import { calendar } from '../config/config.json'

const cal = ical(calendar)

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
      uri: 'http://localhost:4000',
    }),
  ]),
  cache: new InMemoryCache(),
})

const registerIcalRoute = app => app.get('/events.ics', (req, res) =>
  client.query({
    query: gql`
      {
        events {
          title,
          dateStart,
          dateEnd,
          summary,
          location,
          url,
          public,
          ticketed,
          speakers
        }
      }
    `,
  })
    .then((data) => {
      cal.events(get(data, 'data.events', []).map(event => ({
        summary: event.title,
        start: event.dateStart,
        end: event.dateEnd,
        description: event.summary,
      }))).serve(res)
    }))

export default registerIcalRoute
