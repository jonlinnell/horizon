import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const formatDate = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colours.main};
`

const Summary = styled.p`
  color: rgb(230, 230, 230);
  margin-left: 1rem;
`

const Date = styled.p`
  font-weight: bold;
`

const Speaker = styled.p`
  color: rgb(200, 70, 170);
`

const SignageEvent = ({ event }) => (
  <div>
    <Title>{event.title}</Title>
    <Summary>{event.summary}</Summary>
    <Date>{formatDate(event.dateStart)}</Date>
    <Date>{formatDate(event.dateEnd)}</Date>
    {
      event.speakers.map(speaker => (
        <Speaker key={speaker}>{speaker}</Speaker>
      ))
    }
  </div>
)

export default SignageEvent
