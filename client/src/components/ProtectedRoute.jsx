import React from 'react'
import { Route } from 'react-router'
import { AuthConsumer } from './AuthContext'

import ViewLogin from './ViewLogin'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        render={
          props => (
            isAuthenticated
              ? <Component {...props} />
              : <ViewLogin />
          )
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
