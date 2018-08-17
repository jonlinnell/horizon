import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const formatDate = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

const Title = styled.h1`
  font-size: 1.5rem;
  color: rgb(100, 90, 190);
`

const Summary = styled.p`
  color: rgb(230, 230, 230);
  margin-left: 1rem;
`

const Date = styled.p`
  font-weight: bold;
`

const Component = ({ events }) => (
  <div>
    {
      events.map(event => (
        <div>
          <Title>{event.title}</Title>
          <Summary>{event.summary}</Summary>
          <Date>{formatDate(event.dateStart)}</Date>
          <Date>{formatDate(event.dateEnd)}</Date>
        </div>
      ))
    }
  </div>
)

export default Component
