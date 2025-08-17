type ApiMemoryStorage = {
  refreshTokens: () => void
  logout: () => void
}

let __internalMemoryStorage: () => ApiMemoryStorage

export const attachInternalApiMemoryStorage = (data: ApiMemoryStorage) => {
  __internalMemoryStorage = () => data
}

export const refreshTokens = () => {
  const { refreshTokens } = __internalMemoryStorage()

  return refreshTokens()
}

export const logUserOut = () => {
  const { logout } = __internalMemoryStorage()

  return logout()
}
