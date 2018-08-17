import _ from 'lodash'
import casual from 'casual'
import crypto from 'crypto'

import { Event } from '../models'

const fakeEventsData = entries => _.times(entries, () => Event.create({
  id: crypto.randomBytes(8).toString('hex'),
  title: casual.title,
  dateStart: casual.unix_time,
  dateEnd: casual.unix_time,
  summary: casual.description,
  location: casual.address,
  url: casual.url,
  public: casual.coin_flip,
  ticketed: casual.coin_flip,
  speakers: _.times(Math.floor(Math.random() * 2) + 1, () => casual.name),
}))

export default fakeEventsData
