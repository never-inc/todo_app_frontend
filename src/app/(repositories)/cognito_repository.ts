import { CognitoUser } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'

export const signUpWithPassword = async (username: string, email: string, password: string) => {
  const result = await Auth.signUp({
    username: username,
    password: password,
    attributes: {
      email: email,
    },
    autoSignIn: {
      enabled: true,
    },
  })
  return result
}

export const signInWithPassword = async (username: string, password: string) => {
  const result = await Auth.signIn({
    username: username,
    password: password,
  })
  return result as CognitoUser
}

export const confirmRegistration = async (username: string, code: string) => {
  const result = await Auth.confirmSignUp(username, code)
  return result
}

export const resendConfirmationCode = async (username: string) => {
  const result = await Auth.resendSignUp(username)
  return result
}

export const getCurrentSession = async () => {
  const session = await Auth.currentSession()
  return session
}

export const getUserId = async () => {
  const result = (await Auth.currentUserInfo()) as CurrentUserInfo
  return result.attributes?.sub
}

export type CurrentUserInfo = {
  attributes?: { email?: string; email_verified?: boolean; sub: string }
  id?: string
  username?: string
}
