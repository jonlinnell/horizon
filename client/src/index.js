import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'

import 'regenerator-runtime/runtime'

import client from './apolloClient'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import theme from './theme.json'

import history from './history'

import PrivateRoute from './components/PrivateRoute'
import LoginBox from './components/LoginBox'
import Signage from './components/Signage'
import ViewMain from './components/ViewMain'

const PrivateThing = () => (
  <div>
    <p>If you can see this, you&apos;re logged in.</p>
  </div>
)

const Temp = () => (
  <div>
    tester!
  </div>
)

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
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/temp" component={ViewMain} page={Temp} />
          <PrivateRoute exact path="/priv" component={ViewMain} page={PrivateThing} />
          <Route exact path="/signage" component={Signage} />
          <Route exact path="/login" component={LoginBox} />
        </div>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
