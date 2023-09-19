'use client'

import React, { useEffect, useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Amplify, Hub } from 'aws-amplify'
import { useLocalStorage, localStorageKey } from '../(hooks)/use_local_storage'

Amplify.configure({
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? '',
  },
})

type AuthUser = {
  email: string | null
}

const AuthUserContext = React.createContext<
  [AuthUser | null, React.Dispatch<React.SetStateAction<AuthUser | null>>] | undefined
>(undefined)

export const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const { setValueAndStorage } = useLocalStorage(localStorageKey.accessToken)

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload
      console.log('onListenAuthChangeEvent', event, payload.data)

      const setAccessToken = (data: any) => {
        const result: CognitoUser = data as CognitoUser
        const session = result.getSignInUserSession()
        const accessToken = session?.getAccessToken().getJwtToken()
        console.log(accessToken)
        if (!accessToken) {
          console.log('accessToken is empty')
          return
        }
        setValueAndStorage(accessToken)
        console.log('saved accessToken')
      }

      if (event === 'signUp') {
        // ignore
      } else if (event === 'signIn') {
        setAccessToken(payload.data)
      } else if (event === 'autoSignIn') {
        setAccessToken(payload.data)
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      } else if (event === 'confirmSignUp') {
        // ignore
      }
    })
  }, [])

  return <AuthUserContext.Provider value={[authUser, setAuthUser]}>{children}</AuthUserContext.Provider>
}

export const useAuthUser = () => {
  const context = React.useContext(AuthUserContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthUserProvider')
  }
  return context
}
