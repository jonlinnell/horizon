import ical from 'ical-generator'
import { get } from 'lodash'

import { calendar } from '../config/config.json'

import request, { EVENTS } from '../../lib/api'

const cal = ical(calendar)

const registerIcalRoute = app => app.get('/events.ics', (req, res) => request(EVENTS, {
  futureOnly: false,
  includeInCalendar: true,
})
  .then((data) => {
    cal.ttl(60 * 60 * 24)
    cal.events(get(data, 'data.events', []).map(event => ({
      uid: event.id,
      summary: event.title,
      start: event.dateStart,
      end: event.dateEnd,
      description: event.summary,
    }))).serve(res)
  }))

export default registerIcalRoute
