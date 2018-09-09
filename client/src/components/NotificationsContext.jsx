import React, { PureComponent } from 'react'

import { Intent } from '@blueprintjs/core'

const NotificationsContext = React.createContext()

class NotificationsProvider extends PureComponent {
  constructor() {
    super()

    this.state = { notifications: [] }

    this.addNotification = this.addNotification.bind(this)
    this.addError = this.addError.bind(this)
    this.clearNotification = this.clearNotification.bind(this)
  }

  addNotification({ message, intent }) {
    const { notifications } = this.state
    this.setState({
      notifications: [...notifications, {
        index: notifications.length + 1,
        message,
        intent,
      }],
    })
  }

  addError(message) {
    const { notifications } = this.state
    this.setState({
      notifications: [...notifications, {
        index: notifications.length + 1,
        message: JSON.stringify(message, null, 2),
        intent: Intent.DANGER,
      }],
    })
  }

  clearNotification(index) {
    const { notifications } = this.state
    this.setState({
      notifications: notifications.filter(notification => notification.index !== Number(index)),
    })
  }

  render() {
    const { state: { notifications }, props: { children } } = this
    return (
      <NotificationsContext.Provider
        value={{
          notifications,
          addNotification: this.addNotification,
          addError: this.addError,
          clearNotification: this.clearNotification,
        }}
      >
        {children}
      </NotificationsContext.Provider>
    )
  }
}

const NotificationsConsumer = NotificationsContext.Consumer

export { NotificationsConsumer, NotificationsProvider }
