import React from 'react'
import {
  Intent,
  Card,
  H3,
} from '@blueprintjs/core'

import { NotificationsConsumer } from './NotificationsContext'

const ViewAddEvent = () => (
  <Card>
    <H3>Add event</H3>
    <NotificationsConsumer>
      {
        ({ addError, addNotification }) => (
          <div>
            <button
              type="button"
              onClick={() => addError('Super error!!!')}
            />
            <button
              type="button"
              onClick={() => addNotification({
                message: 'All good bro',
                intent: Intent.SUCCESS,
              })}
            />
          </div>
        )
      }
    </NotificationsConsumer>
  </Card>
)

export default ViewAddEvent
