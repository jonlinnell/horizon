import React from 'react'
import {
  Intent,
  FormGroup,
  Colors,
  Card,
  H5,
  InputGroup,
  Button,
  Checkbox,
} from '@blueprintjs/core'
import { DateRangePicker, TimePrecision } from '@blueprintjs/datetime'
import { withFormik } from 'formik'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

import { validation } from '../../../server/config/config.json'

import { CREATE_NEW_EVENT } from '../../../lib/queries'

import { NotificationsConsumer } from './NotificationsContext'

const InputErrorText = styled.p`
  margin-left: auto;
  padding-top: 6px;
  color: ${Colors.RED2};
`

const initialValues = {
  title: null,
  dateStart: null,
  dateEnd: null,
  summary: null,
  location: null,
  url: null,
  public: null,
  displayOnSignage: true,
  includeInCalendar: true,
  ticketed: true,
  speakers: null,
}

const FormAddEvent = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <FormGroup
      helperText="A title for the event."
      label="Event Name"
      labelFor="title"
      labelInfo="(required)"
    >
      <InputGroup
        name="title"
        placeholder="Event Name"
        onChange={handleChange}
        intent={
          errors.title
            ? Intent.DANGER
            : Intent.NONE
        }
      />
      { touched && !isSubmitting && <InputErrorText>{errors.title}</InputErrorText> }
    </FormGroup>

    <FormGroup
      helperText="When does this event start and finish?"
    >
      <DateRangePicker
        allowSingleDayRange
        contiguousCalendarMonths={false}
        timePrecision={TimePrecision.MINUTE}
        timePickerProps={{}}
      />
    </FormGroup>

    <FormGroup
      label="Event Summary"
      labelFor="summary"
    >
      <InputGroup
        name="summary"
        placeholder="Summary"
        onChange={handleChange}
        intent={
          errors.summary
            ? Intent.DANGER
            : Intent.NONE
        }
      />
      { touched && !isSubmitting && <InputErrorText>{errors.summary}</InputErrorText> }
    </FormGroup>

    <FormGroup
      label="Location"
      labelFor="location"
    >
      <InputGroup
        name="location"
        placeholder="Location"
        onChange={handleChange}
        intent={
          errors.location
            ? Intent.DANGER
            : Intent.NONE
        }
      />
      { touched && !isSubmitting && <InputErrorText>{errors.location}</InputErrorText> }
    </FormGroup>

    <FormGroup
      label="URL"
      labelFor="url"
    >
      <InputGroup
        name="url"
        placeholder="URL"
        onChange={handleChange}
        intent={
          errors.url
            ? Intent.DANGER
            : Intent.NONE
        }
      />
      { touched && !isSubmitting && <InputErrorText>{errors.url}</InputErrorText> }
    </FormGroup>

    <Checkbox
      name="public"
      label="This is a public event."
      onChange={handleChange}
    />

    <Checkbox
      name="ticketed"
      label="This is a ticketed event."
      onChange={handleChange}
    />

    <Checkbox
      name="displayOnSignage"
      label="Display this event on digital signage."
      onChange={handleChange}
    />

    <Checkbox
      name="includeInCalendar"
      label="Include this event in the calendar feed."
      onChange={handleChange}
    />

    <Button
      type="submit"
      disabled={isSubmitting}
      intent={Intent.PRIMARY}
      text="Submit"
    />
  </form>
)

const EnhancedFormAddEvent = withFormik({
  mapPropsToValues: () => (initialValues),
  validate: (values) => {
    const { titleLength, summaryLength } = validation
    const errors = {}

    if (!values.title) {
      errors.title = 'This field is required.'
    } else if (values.title.length > Number(titleLength)) {
      errors.title = `Title is too long. Max length: ${titleLength}.`
    }

    if (values.summary) {
      if (values.summary.length > Number(summaryLength)) {
        errors.summary = 'Too long!'
      }
    }

    return errors
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      onSubmit(values)
      setSubmitting(false)
    }, 1000)
  },
})(FormAddEvent)

const ViewAddEvent = () => (
  <Card>
    <H5>Add event</H5>
    <NotificationsConsumer>
      {({ addError, addNotification }) => (
        <Mutation mutation={CREATE_NEW_EVENT}>
          {(addEvent, { loading, error, data }) => (
            <EnhancedFormAddEvent />
          )}
        </Mutation>
      )}
    </NotificationsConsumer>
  </Card>
)

export default ViewAddEvent
