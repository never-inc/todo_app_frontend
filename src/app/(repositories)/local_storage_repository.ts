'use client'

export const localStorageKey = {
  accessToken: 'accessToken',
}

export const getValue = (key: keyof typeof localStorageKey) => {
  return window.localStorage.getItem(key)
}

export const setValue = (key: keyof typeof localStorageKey, value: string) => {
  window.localStorage.setItem(key, value)
}

export const removeValue = (key: keyof typeof localStorageKey) => {
  window.localStorage.removeItem(key)
}
