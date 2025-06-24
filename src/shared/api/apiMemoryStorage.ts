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

export const getApiRefreshToken = () => {
  const { refreshToken } = __internalMemoryStorage()

  return refreshToken
}

export const getRefreshedTokens = (data: Pick<Tokens, 'refreshToken'>) => {
  const { refreshTokens } = __internalMemoryStorage()

  return refreshTokens(data)
}

export const setTokens = (data: Tokens) => {
  const { updateTokens } = __internalMemoryStorage()

  return updateTokens(data)
}

export const logUserOut = () => {
  const { logout } = __internalMemoryStorage()

  return logout()
}
