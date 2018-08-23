import React from 'react'
import {
  Button,
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'

import { AuthConsumer } from './AuthContext'

const MenuContent = (
  <Menu>
    <MenuItem disabled icon="user" text="Users" />
    <MenuItem disabled icon="settings" text="Settings" />
    <MenuDivider />
    <AuthConsumer>
      {({ logout }) => (
        <MenuItem icon="log-out" text="Log out" onClick={logout} />
      )}
    </AuthConsumer>
  </Menu>
)

const MenuAppSettings = () => (
  <Popover content={MenuContent} position={Position.BOTTOM}>
    <Button className={Classes.MINIMAL} icon="cog" />
  </Popover>
)

export default MenuAppSettings
