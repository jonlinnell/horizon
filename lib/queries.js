import gql from 'graphql-tag'

export const allEvents = gql`
  query Events($sort: String, $order: Order) {
    events(
      sort: $sort,
      order: $order
    ) {
      id,
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
`

export const eventById = gql`
  query Event($id: ID!) {
    eventById(id: $id) {
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
`

export const authenticate = gql`
  query Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      token
    }
  }
`