import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import { allEvents } from '../../../../lib/api'

import SignageEvent from '../SignageEvent'

const Signage = styled.div`
  font-family: '${props => props.theme.typeface.primary || 'Times New Roman'}';
`

const Component = () => (
  <Signage>
    <Query
      query={allEvents}
      pollInterval={1000}
    >
      {
        ({ loading, error, data }) => {
          if (error) return <p>error...</p>
          if (loading) return <p>loading...</p>

          return (data.events.map(event => (
            <div key={event.id}>
              <SignageEvent event={event} key={event.id} />
            </div>
          )))
        }
      }
    </Query>
  </Signage>
)

export default Component
