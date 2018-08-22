import React from 'react'
import { Button } from '@blueprintjs/core'

import { AuthConsumer } from './AuthContext'

const ButtonSignout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <Button
        type="button"
        onClick={logout}
      >
        Bye
      </Button>
    )}
  </AuthConsumer>
)

export default ButtonSignout
