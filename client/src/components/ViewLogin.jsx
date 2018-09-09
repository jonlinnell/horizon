import React from 'react'
import {
  Button,
  Card,
  Colors,
  H5,
  InputGroup,
} from '@blueprintjs/core'
import styled from 'styled-components'
import { Formik } from 'formik'

import { AuthConsumer } from './AuthContext'

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.DARK_GRAY5};
`

const CardWrapper = styled.div`
  width: 320px;
  margin: auto;
  align-items: center;
`

const StyledInputGroup = styled(InputGroup)`
  margin: 12px 0;
`

const ErrorText = styled.span`
  color: ${Colors.VERMILION3};
  font-size: 0.8rem;
`

const LoginBox = () => (
  <AuthConsumer>
    {({ login }) => (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validate={
          (values) => {
            const errors = {}

            if (!values.username) {
              errors.username = 'Please enter a username.'
            }

            return errors
          }
        }
        onSubmit={(
          values,
          { setSubmitting, setErrors }
        ) => {
          setSubmitting(true)
          login(values, setErrors)
          setSubmitting(false)
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <LoginWrapper className="login-wrapper">
            <CardWrapper>
              <Card>
                <H5>Login to your account</H5>
                <form onSubmit={handleSubmit}>
                  <StyledInputGroup
                    name="username"
                    leftIcon="user"
                    placeholder="Username"
                    large
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  { touched && !isSubmitting && <ErrorText>{errors.username}</ErrorText> }
                  <StyledInputGroup
                    name="password"
                    placeholder="Password"
                    type="password"
                    leftIcon="lock"
                    large
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <Button
                    type="submit"
                    fill
                    large
                    disabled={isSubmitting}
                    intent="primary"
                  >
                    Login
                  </Button>
                  {
                    errors.graphQLErrors
                      ? <ErrorText>{errors.graphQLErrors[0].message}</ErrorText>
                      : null
                  }
                </form>
              </Card>
            </CardWrapper>
          </LoginWrapper>
        )}
      />
    )}
  </AuthConsumer>
)

export default LoginBox