import gql from 'graphql-tag'

export const EVENTS = gql`
  query Events(
    $sort: String,
    $order: Order,
    $futureOnly: Boolean,
    $displayOnSignage: Boolean,
    $includeInCalendar: Boolean,
  ) {
    events(
      sort: $sort,
      order: $order,
      futureOnly: $futureOnly,
      displayOnSignage: $displayOnSignage,
      includeInCalendar: $includeInCalendar
    ) {
      id,
      title,
      dateStart,
      dateEnd,
      summary,
      location,
      url,
      public,
      displayOnSignage,
      includeInCalendar,
      ticketed,
      speakers
    }
  }
`

export const EVENT = gql`
  query Event($id: ID!) {
    eventById(id: $id) {
      title,
      dateStart,
      dateEnd,
      summary,
      location,
      url,
      public,
      displayOnSignage,
      includeInCalendar,
      ticketed,
      speakers
    }
  }
`

export const AUTHENTICATE = gql`
  query Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password)
  }
`

export const ME = gql`
{
  me {
    username,
    id,
    roles
  }
}
`
