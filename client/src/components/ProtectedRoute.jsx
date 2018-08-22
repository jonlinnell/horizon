import React from 'react'
import { Route } from 'react-router'
import { AuthConsumer } from './AuthContext'

import LoginBox from './LoginBox'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        render={
          props => (
            isAuthenticated
              ? <Component {...props} />
              : <LoginBox />
          )
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
