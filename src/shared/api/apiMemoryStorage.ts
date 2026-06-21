type ApiMemoryStorage = {
  refreshTokens: () => Promise<void>
  logout: () => void
}

let __internalMemoryStorage: () => ApiMemoryStorage

export const attachInternalApiMemoryStorage = (data: ApiMemoryStorage) => {
  __internalMemoryStorage = () => data
}

export const refreshTokens = async () => {
  const { refreshTokens } = __internalMemoryStorage()

  return await refreshTokens()
}

export const logUserOut = () => {
  const { logout } = __internalMemoryStorage()

  return logout()
}
