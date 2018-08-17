import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import SignageEvent from '../SignageEvent'

import theme from '../../theme.json'

const Signage = styled.div`
  font-family: '${props => props.theme.typeface.primary || 'Times New Roman'}';
`

const Component = ({ events }) => (
  <ThemeProvider theme={theme}>
    <Signage>
      {
        events.map(event => (
          <div key={event.id}>
            <SignageEvent event={event} key={event.id} />
          </div>
        ))
      }
    </Signage>
  </ThemeProvider>
)

export default Component
