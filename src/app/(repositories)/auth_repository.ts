import { CognitoUser } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'

export type CurrentUserInfo = {
  attributes?: { email?: string; email_verified?: boolean; sub: string }
  id?: string
  username?: string
}

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

export const confirmRegistration = async (username: string, code: string) => {
  const result = await Auth.confirmSignUp(username, code)
  return result
}

export const resendConfirmationCode = async (username: string) => {
  const result = await Auth.resendSignUp(username)
  return result
}

export const signInWithPassword = async (username: string, password: string) => {
  const result = await Auth.signIn({
    username: username,
    password: password,
  })
  return result as CognitoUser
}

export const signOut = async () => {
  const result = await Auth.signOut()
  return result
}

export const getCurrentSession = async () => {
  const result = await Auth.currentSession()
  return result
}

export const getUserId = async () => {
  const result = (await Auth.currentUserInfo()) as CurrentUserInfo
  return result.attributes?.sub
}
