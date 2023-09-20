'use client'

import React, { useEffect, useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Amplify, Hub } from 'aws-amplify'
import * as local_storage_repository from '../(repositories)/local_storage_repository'

// TODO このタイミングで良い？
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

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload
      console.log('onListenAuthChangeEvent', event, payload.data)

      // アクセストークンをローカルストレージに保存
      const setAccessToken = (data: any) => {
        const result: CognitoUser = data as CognitoUser
        const session = result.getSignInUserSession()
        const accessToken = session?.getAccessToken().getJwtToken()
        console.log(result)
        if (!accessToken) {
          console.log('accessToken is empty')
          return
        }
        local_storage_repository.setValue('accessToken', accessToken)
        console.log('saved accessToken')
      }

      // イベントごとに処理
      if (event === 'signUp') {
        // ignore
      } else if (event === 'signIn') {
        setAccessToken(payload.data)
      } else if (event === 'autoSignIn') {
        setAccessToken(payload.data)
      } else if (event === 'autoSignIn_failure') {
        // todo: redirect to sign in page
      } else if (event === 'confirmSignUp') {
        // ignore
      } else if (event === 'signOut') {
        local_storage_repository.removeValue('accessToken')
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
