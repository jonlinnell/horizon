import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'

import ViewAllEvents from './ViewAllEvents'
import ViewAddEvents from './ViewAddEvent'

const Container = styled.div`
  margin: 6px 12px 12px 12px;
`

const ViewAdmin = () => (
  <div>
    <Navbar />
    <Container>
      <ViewAllEvents />
      <ViewAddEvents />
    </Container>
  </div>
)

export default ViewAdmin
