import * as yup from 'yup'

import { validation } from '../../../server/config/config.json'

const schemaAddEvent = yup.object().shape({
  title: yup
    .string('Invalid text entered.')
    .required('Title is required (how else are people going to know what this is called?)')
    .max(validation.titleLength, `Title is too long! Keep it under ${validation.titleLength} characters.`),
  dateStart: yup
    .date('This isn\'t a valid date. How did you even do this?')
    .required('Start date is required.'),
  dateEnd: yup
    .date('This isn\'t a valid date. How did you even do this?')
    .required('End date is required.'),
  summary: yup
    .string('Invalid text entered.')
    .max(validation.summaryLength, `Summary is too long! Keep it under ${validation.summaryLength} characters.`),
  location: yup
    .string('Invalid text entered.'),
  url: yup
    .string(),
  public: yup
    .boolean()
    .default(false),
  displayOnSignage: yup
    .boolean()
    .default(true),
  includeInCalendar: yup
    .boolean()
    .default(true),
  ticketed: yup
    .boolean()
    .default(false),
  speakers: yup
    .string(),
})

export default schemaAddEvent
