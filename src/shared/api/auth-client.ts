import type { BetterAuthClientPlugin } from 'better-auth'
import type { BetterFetchOption } from 'better-auth/react'

import { passkeyClient } from '@better-auth/passkey/client'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { env } from '../config'

export const authClient = createAuthClient({
  baseURL: env.VITE_API_BASE_URL + '/auth',
  fetchOptions: { throw: true },
  plugins: [
    passkeyClient(),
    revokeSessionByIdPlugin(),
    inferAdditionalFields({
      session: {
        browser: { type: 'string', input: false },
        os: { type: 'string', input: false },
        isCurrent: { type: 'boolean', input: false }
      }
    })
  ]
})

function revokeSessionByIdPlugin() {
  return {
    id: 'revoke-session-id',
    getActions: $fetch => ({
      revokeSessionById: async (
        data: { id: string },
        fetchOptions?: BetterFetchOption
      ) =>
        $fetch('/revoke-session-id', {
          method: 'POST',
          body: { id: data.id },
          ...fetchOptions
        })
    })
  } satisfies BetterAuthClientPlugin
}

type ErrorTypes = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>

const errorCodes = {
  PREVIOUSLY_REGISTERED: 'Unable to register passkey.',
  PASSKEY_NOT_FOUND: 'This passkey is not registered for your account.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    'An account with this email address already exists. Please sign in or use a different email.',
  INVALID_EMAIL_OR_PASSWORD:
    'The email or password you entered is incorrect. Please try again.'
} satisfies ErrorTypes

export const getAuthErrorMessage = (code: string) => {
  if (code in errorCodes) return errorCodes[code as keyof typeof errorCodes]

  return ''
}
