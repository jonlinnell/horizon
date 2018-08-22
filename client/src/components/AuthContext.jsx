import React, { PureComponent } from 'react'

import client from '../apolloClient'
import { AUTHENTICATE, ME } from '../../../lib/queries'

const AuthContext = React.createContext()

class AuthProvider extends PureComponent {
  constructor() {
    super()

    this.state = { isAuthenticated: false }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.resume = this.resume.bind(this)
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

  async resume(callback) {
    try {
      const { data } = await client.query({ query: ME })
      if (data) {
        this.setState({ isAuthenticated: true })
      }
    } catch (error) {
      callback(error)
    }
  }

  render() {
    const { state: { isAuthenticated }, props: { children } } = this
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login: this.login,
          logout: this.logout,
          resume: this.resume,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }
