import React from 'react'
import {
  Intent,
  Card,
  H5,
} from '@blueprintjs/core'

import { NotificationsConsumer } from './NotificationsContext'

const ViewAddEvent = () => (
  <Card>
    <H5>Add event</H5>
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
