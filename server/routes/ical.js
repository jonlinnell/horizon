import ical from 'ical-generator'
import { get } from 'lodash'

import { calendar } from '../config/config.json'

import request, { allEvents } from '../lib/api'

const cal = ical(calendar)

const registerIcalRoute = app => app.get('/events.ics', (req, res) =>
  request(allEvents())
    .then((data) => {
      cal.events(get(data, 'data.events', []).map(event => ({
        summary: event.title,
        start: event.dateStart,
        end: event.dateEnd,
        description: event.summary,
      }))).serve(res)
    }))

export default registerIcalRoute
