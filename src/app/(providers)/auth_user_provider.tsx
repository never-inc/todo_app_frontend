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

      // サインイン後のデータをセット
      const setSignInData = (data: any) => {
        // メールアドレスをセット
        const email = data.attributes?.email as string | undefined
        console.log('email', email)
        setAuthUser({ email: email ?? null })

        // アクセストークンをローカルストレージに保存
        const cognitoUser: CognitoUser = data as CognitoUser
        const session = cognitoUser.getSignInUserSession()
        const accessToken = session?.getAccessToken().getJwtToken()
        if (!accessToken) {
          console.log('accessToken is empty')
          return
        }
        local_storage_repository.setValue('accessToken', accessToken)
        console.log('saved accessToken')
      }

      // イベントごとに処理
      if (event === 'signUp') {
        // メールアドレスをセット
        const cognitoUser = payload.data?.user as CognitoUser | undefined
        if (cognitoUser) {
          const email = cognitoUser.getUsername()
          console.log('email', email)
          setAuthUser({ email: email })
        }
      } else if (event === 'signIn') {
        setSignInData(payload.data)
      } else if (event === 'autoSignIn') {
        setSignInData(payload.data)
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
    throw new Error('useAuthUser must be used within a AuthUserProvider')
  }
  return context
}
