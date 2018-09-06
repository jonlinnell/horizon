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

export const CREATE_NEW_EVENT = gql`
  mutation createNewEvent(
    $title: String!,
    $dateStart: DateTime!,
    $dateEnd: DateTime!,
    $summary: String,
    $public: Boolean,
    $ticketed: Boolean!,
    $displayOnSignage: Boolean,
    $includeInCalendar: Boolean,
    $location:String,
    $speakers: [String],
    $url: String,
  ) {
    createNewEvent(input: {
      title: $title,
      dateStart:$dateStart ,
      dateEnd: $dateEnd,
      summary: $summary,
      public: $public,
      ticketed: $ticketed,
      displayOnSignage: $displayOnSignage,
      includeInCalendar: $includeInCalendar,
      location: $location,
      speakers: $speakers,
      url: $url
    }){
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
