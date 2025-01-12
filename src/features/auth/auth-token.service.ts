import type { Tokens } from './auth.types'

class AuthTokensService {
  private STORAGE_KEY = 'tokens'

  saveTokens(tokens: Tokens) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokens))
  }

  getTokens(): Tokens | null {
    const tokens = localStorage.getItem(this.STORAGE_KEY)

    return tokens ? JSON.parse(tokens) : null
  }

  removeTokens() {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

export const authTokenService = new AuthTokensService()
