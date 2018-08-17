import React, { PureComponent } from 'react'

import request, { allEvents } from '../../../../lib/api'

import SignageView from './component'

class Signage extends PureComponent {
  constructor() {
    super()

    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    request(allEvents())
      .then(data => this.setState({ events: data.data.events }))
  }

  render() {
    const { events } = this.state

    return (
      <SignageView events={events} />
    )
  }
}

export default Signage
