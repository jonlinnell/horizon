import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { injectGlobal } from 'styled-components'

import history from './history'

import Signage from './components/Signage'

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

const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/signage" component={Signage} />
      <Route exact path="/" component={Temp} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
