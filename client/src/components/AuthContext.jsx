import React, { PureComponent } from 'react'

import client from '../apolloClient'
import { AUTHENTICATE } from '../../../lib/queries'

const AuthContext = React.createContext()

class AuthProvider extends PureComponent {
  constructor() {
    super()

    this.state = { isAuthenticated: false }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  async login(credentials, callback) {
    try {
      const { data } = await client.query({
        query: AUTHENTICATE,
        variables: credentials,
      })
      localStorage.setItem('token', data.authenticate)
      this.setState({ isAuthenticated: true })
    } catch (error) {
      callback(error)
    }
  }

  logout() {
    localStorage.clear('token')
    this.setState({ isAuthenticated: false })
  }

  render() {
    const { state: { isAuthenticated }, props: { children } } = this
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login: this.login,
          logout: this.logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }
