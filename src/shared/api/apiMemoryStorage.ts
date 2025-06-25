type Tokens = {
  accessToken: string
  refreshToken: string
}

type ApiMemoryStorage = {
  accessToken: string
  refreshToken: string
  refreshTokens: (data: Pick<Tokens, 'refreshToken'>) => Promise<Tokens>
  updateTokens: (data: Tokens) => void
  logout: () => void
}

let __internalMemoryStorage: () => ApiMemoryStorage

export const attachInternalApiMemoryStorage = (data: ApiMemoryStorage) => {
  __internalMemoryStorage = () => data
}

export const getApiAccessToken = () => {
  const { accessToken } = __internalMemoryStorage()

  return accessToken
}

export const getRefreshedTokens = () => {
  const { refreshTokens, refreshToken } = __internalMemoryStorage()

  return refreshTokens({ refreshToken })
}

export const setTokens = (data: Tokens) => {
  const { updateTokens } = __internalMemoryStorage()

  return updateTokens(data)
}

export const logUserOut = () => {
  const { logout } = __internalMemoryStorage()

  return logout()
}
