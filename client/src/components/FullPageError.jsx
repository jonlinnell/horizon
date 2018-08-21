import React from 'react'
import styled from 'styled-components'
import {
  NonIdealState,
  Colors,
} from '@blueprintjs/core'

const MessageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.LIGHT_GRAY5};
`

const FullPageError = error => (
  <MessageWrapper>
    <NonIdealState
      icon="error"
      title="Something pretty bad happened"
      description={JSON.stringify(error)}
    />
  </MessageWrapper>
)

export default FullPageError
