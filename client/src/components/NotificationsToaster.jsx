import React from 'react'
import {
  Toaster,
  Toast,
  Position,
} from '@blueprintjs/core'

import { NotificationsConsumer } from './NotificationsContext'

const NotificationsToaster = () => (
  <NotificationsConsumer>
    {({ notifications, clearNotification }) => (
      <Toaster
        position={Position.BOTTOM_RIGHT}
      >
        {
          notifications.map(({ index, intent, message }) => (
            <Toast
              key={index}
              intent={intent}
              message={message}
              onDismiss={() => clearNotification(index)}
            />
          ))
        }
      </Toaster>
    )}
  </NotificationsConsumer>
)

export default NotificationsToaster
