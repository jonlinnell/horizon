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
import { DateInput, TimePrecision } from '@blueprintjs/datetime'
import { Formik, Form } from 'formik'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

import { CREATE_NEW_EVENT } from '../../../lib/queries'

import { NotificationsConsumer } from './NotificationsContext'

import schemaAddEvent from '../schema/schemaAddEvent'

const InputErrorText = styled.p`
  margin-left: auto;
  padding-top: 6px;
  color: ${Colors.RED2};
`

const FormComponent = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  isSubmitting,
}) => (
  <Form>
    <FormGroup
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
      label="Starting at"
      labelFor="dateStart"
    >
      <DateInput
        name="dateStart"
        formatDate={date => date.toLocaleString()}
        shortcuts={false}
        onChange={date => setFieldValue('dateStart', date.toISOString())}
        parseDate={str => new Date(str)}
        timePrecision={TimePrecision.MINUTE}
      />
      { touched && !isSubmitting && <InputErrorText>{errors.dateStart}</InputErrorText> }
    </FormGroup>

    <FormGroup
      label="Ending at"
      labelFor="dateEnd"
    >
      <DateInput
        name="dateEnd"
        formatDate={date => date.toLocaleString()}
        shortcuts={false}
        onChange={date => setFieldValue('dateEnd', date.toISOString())}
        parseDate={str => new Date(str)}
        timePrecision={TimePrecision.MINUTE}
      />
      { touched && !isSubmitting && <InputErrorText>{errors.dateEnd}</InputErrorText> }
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
  </Form>
)

const ViewAddEvent = () => (
  <Card>
    <H5>Add event</H5>
    <NotificationsConsumer>
      {({ addError, addNotification }) => (
        <Mutation mutation={CREATE_NEW_EVENT}>
          {(addEvent, { loading, error, data }) => (
            <Formik
              validationSchema={schemaAddEvent}
              onSubmit={(values, { setSubmitting }) => {
                addEvent({ variables: values })
                  .then(apolloResponse => alert(JSON.stringify(apolloResponse)))
                  .catch(apolloError => alert(JSON.stringify(apolloError)))
                setSubmitting(false)
              }}
              render={FormComponent}
            />
          )}
        </Mutation>
      )}
    </NotificationsConsumer>
  </Card>
)

export default ViewAddEvent
