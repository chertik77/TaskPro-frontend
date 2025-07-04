type Tokens = {
  accessToken: string
  refreshToken: string
}

type ApiMemoryStorage = Tokens & {
  getTokens: (data: Pick<Tokens, 'refreshToken'>) => Promise<Tokens>
  setTokens: (data: Tokens) => void
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
  const { getTokens, refreshToken } = __internalMemoryStorage()

  return getTokens({ refreshToken })
}

export const setTokens = (data: Tokens) => {
  const { setTokens } = __internalMemoryStorage()

  return setTokens(data)
}

export const logUserOut = () => {
  const { logout } = __internalMemoryStorage()

  return logout()
}
