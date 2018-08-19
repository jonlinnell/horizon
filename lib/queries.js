import gql from 'graphql-tag'

export const allEvents = gql`
{
  events {
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