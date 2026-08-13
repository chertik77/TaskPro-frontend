import * as v from 'valibot'

export const PasskeyNameSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  )
})

export const ChangePasswordSchema = v.pipe(
  v.object({
    currentPassword: v.pipe(
      v.string(),
      v.minLength(2, 'Please enter your current password.')
    ),
    newPassword: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(8, 'Please enter at least 8 characters.'),
      v.maxLength(64, 'Please enter at most 64 characters.')
    ),
    confirmPassword: v.string()
  }),
  v.forward(
    v.partialCheck(
      [['currentPassword'], ['newPassword']],
      input => input.currentPassword !== input.newPassword,
      'Please choose a password different from your current one.'
    ),
    ['newPassword']
  ),
  v.forward(
    v.partialCheck(
      [['newPassword'], ['confirmPassword']],
      input => input.newPassword === input.confirmPassword,
      'Passwords don’t match.'
    ),
    ['confirmPassword']
  )
)

export type PasskeyNameSchema = v.InferOutput<typeof PasskeyNameSchema>
export type ChangePasswordSchema = v.InferOutput<typeof ChangePasswordSchema>
