export const allEvents = () => `{
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
}`

export const eventById = id => `{
  eventById(id: "${id}") {
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
}`
