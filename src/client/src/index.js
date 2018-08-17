import React from 'react'
import ReactDOM from 'react-dom'

import Signage from './components/Signage'

import './index.scss'

const App = () => (
  <div className="welcome">
    <Signage />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
