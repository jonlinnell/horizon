import React from 'react'
import { Route, Redirect } from 'react-router'
import { Query } from 'react-apollo'

import FullPageError from '../FullPageError'

import { ME } from '../../../../lib/queries'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Query query={ME}>
        {({ data, error }) => {
          if (error) { return <FullPageError error={error} /> }

          if (data.me !== null) {
            return <Component {...props} />
          }

          return <Redirect to={{ pathname: '/login' }} />
        }}
      </Query>
    )}
  />
)

export default PrivateRoute
