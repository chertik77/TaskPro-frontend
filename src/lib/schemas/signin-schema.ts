import {
  custom,
  minLength,
  object,
  string,
  toTrimmed,
  type Output
} from 'valibot'
import isEmail from 'validator/lib/isEmail'

export const signinSchema = object({
  email: string([toTrimmed(), custom(isEmail, 'Please enter a valid email.')]),
  password: string([
    toTrimmed(),
    minLength(8, 'Please enter at least 8 characters.')
  ])
})

export type SigninSchemaFields = Output<typeof signinSchema>
