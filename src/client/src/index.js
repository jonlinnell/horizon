import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.scss'

const Title = styled.h1`
  font-size: 1.8rem;
  font-family: 'Verdana', sans-serif;
`

const App = () => (
  <div className="welcome">
    <Title>Hello</Title>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
