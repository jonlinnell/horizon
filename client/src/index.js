import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { injectGlobal, ThemeProvider } from 'styled-components'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { graphqlHost } from '../../server/config/config.json'
import theme from './theme.json'

import history from './history'

import Signage from './components/Signage'

const { host, port } = graphqlHost

const Temp = () => (
  <div>
    <p>test</p>
  </div>
)

/* eslint-disable-next-line no-unused-expressions */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const client = new ApolloClient({
  uri: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${host}:${port}/graphql`,
})

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div>
          <Route exact path="/signage" component={Signage} />
          <Route exact path="/" component={Temp} />
        </div>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
