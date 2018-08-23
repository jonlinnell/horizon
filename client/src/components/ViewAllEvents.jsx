import React from 'react'
import {
  Card,
  H5,
  Spinner,
} from '@blueprintjs/core'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import moment from 'moment'
import Calendar from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { EVENTS } from '../../../lib/queries'
import { NotificationsConsumer } from './NotificationsContext'

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

const SpinnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-content: middle;
`

const StyledCalendar = styled(Calendar)`
  min-height: 800px;
`

const ViewAllEvents = () => (
  <Card>
    <H5>All events</H5>
    <NotificationsConsumer>
      {
        ({ addError }) => (
          <Query
            query={EVENTS}
            pollInterval={30000}
          >
            {
              ({ loading, error, data }) => {
                if (error) {
                  addError(error)
                  return <p>ruh roh</p>
                }
                if (loading) {
                  return (
                    <SpinnerWrapper>
                      <Spinner />
                    </SpinnerWrapper>
                  )
                }

                return (
                  <StyledCalendar
                    views={Object.keys(Calendar.Views).map(k => Calendar.Views[k])}
                    events={data.events.map(({
                      id,
                      title,
                      dateStart,
                      dateEnd,
                    }) => ({
                      id,
                      title,
                      start: new Date(dateStart),
                      end: new Date(dateEnd),
                    }))}
                  />
                )
              }
            }
          </Query>
        )
      }
    </NotificationsConsumer>
  </Card>
)

export default ViewAllEvents
