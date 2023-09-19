import { useEffect, useState } from 'react'

export const localStorageKey = {
  accessToken: 'accessToken',
}

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    const res = window.localStorage.getItem(key)
    if (!res) {
      setValue('local storage is empty')
      return
    }
    setValue(res)
  }, [key])

  const setValueAndStorage = (newValue: string) => {
    window.localStorage.setItem(key, newValue)
    setValue(newValue)
  }

  return { value, setValueAndStorage }
}
