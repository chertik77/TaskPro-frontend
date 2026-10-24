import type { authClient } from './auth-client'

type AuthErrorCode = keyof typeof authClient.$ERROR_CODES

const AUTH_ERROR_MESSAGES = {
  PASSKEY_NOT_FOUND: 'This passkey is not registered for your account.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    'An account with this email address already exists. Please sign in or use a different email.',
  INVALID_EMAIL_OR_PASSWORD:
    'The email or password you entered is incorrect. Please try again.',
  INVALID_PASSWORD: 'The password you entered is incorrect. Please try again.',
  SESSION_EXPIRED:
    'For security, please sign in again before deleting your account.',
  FAILED_TO_UNLINK_LAST_ACCOUNT:
    'You cannot unlink your last account. Please add another account first.'
} satisfies Partial<Record<AuthErrorCode, string>>

export const getAuthErrorMessage = (code: string): string | undefined =>
  Object.hasOwn(AUTH_ERROR_MESSAGES, code)
    ? AUTH_ERROR_MESSAGES[code as keyof typeof AUTH_ERROR_MESSAGES]
    : undefined
