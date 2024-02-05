import {
  custom,
  minLength,
  object,
  string,
  toTrimmed,
  type Output
} from 'valibot'
import isEmail from 'validator/lib/isEmail'

export const signupSchema = object({
  name: string([
    toTrimmed(),
    minLength(5, 'Please enter at least 5 characters.')
  ]),
  email: string([toTrimmed(), custom(isEmail, 'Please enter a valid email.')]),
  password: string([
    toTrimmed(),
    minLength(8, 'Please enter at least 8 characters.')
  ])
})

export type SignupSchemaFields = Output<typeof signupSchema>
