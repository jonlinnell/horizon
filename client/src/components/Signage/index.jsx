import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import { allEvents } from '../../../../lib/api'

import SignageEvent from '../SignageEvent'

const boxWidth = 492

const SectionHeader = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 500;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Signage = styled.div`
  font-family: '${props => props.theme.fonts.primary || 'Times New Roman'}';

  @media only screen and (min-width: ${boxWidth * 3 + 1}px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: ${boxWidth * 3}px;
  }

  @media only screen
    and (min-width: ${boxWidth * 2}px)
    and (max-width: ${boxWidth * 3}px)
  {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: ${boxWidth * 2}px;
  }
`

const Component = () => (
  <FlexWrapper>
    <SectionHeader>Upcoming Events</SectionHeader>
    <Signage>
      <Query
        query={allEvents}
        pollInterval={15000}
      >
        {
          ({ loading, error, data }) => {
            if (error) return <p>error...</p>
            if (loading) return <p>loading...</p>

            return (data.events.map(event => <SignageEvent event={event} key={event.id} />))
          }
        }
      </Query>
    </Signage>
  </FlexWrapper>
)

export default Component
