import React from 'react'
import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  Alignment,
  ButtonGroup,
  NavbarDivider,
} from '@blueprintjs/core'
import styled from 'styled-components'

import MenuAppSettings from './MenuAppSettings'

const NavbarContentWrapper = styled.div`
  margin: 12px;
`

const AppNavbar = () => (
  <NavbarContentWrapper>
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>
          Horizon
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <ButtonGroup>
          <NavbarDivider />
          <MenuAppSettings />
        </ButtonGroup>
      </NavbarGroup>
    </Navbar>
  </NavbarContentWrapper>
)

export default AppNavbar
