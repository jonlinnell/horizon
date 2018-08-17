import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'

import history from './history'

import Signage from './components/Signage'

import './index.scss'

const Temp = () => (
  <div>
    <p>test</p>
  </div>
)

const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/signage" component={Signage} />
      <Route exact path="/" component={Temp} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))