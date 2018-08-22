import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'

import 'regenerator-runtime/runtime'

import client from './apolloClient'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import theme from './theme.json'

import { AuthProvider, AuthConsumer } from './components/AuthContext'

import history from './history'

import ProtectedRoute from './components/ProtectedRoute'
import Signage from './components/Signage'
import ViewAdmin from './components/ViewAdmin'
import LoginBox from './components/LoginBox'

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Dosis');

  html {
    box-sizing: border-box;
    min-height: 100vh;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

const App = () => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <AuthConsumer>
            {({ isAuthenticated, resume }) => {
              // This is super glitchy and needs fixing!
              if (localStorage.getItem('token')) {
                resume(console.log)
              }

              return (
                <Switch>
                  <Route exact path="/signage" component={Signage} />
                  <ProtectedRoute path="/" component={isAuthenticated ? ViewAdmin : LoginBox} />
                </Switch>
              )
            }}
          </AuthConsumer>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
