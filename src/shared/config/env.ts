import * as v from 'valibot'

const EnvSchema = v.object({
  VITE_API_BASE_URL: v.pipe(v.string(), v.url()),
  VITE_GOOGLE_CLIENT_ID: v.string()
})

export const env = v.parse(EnvSchema, import.meta.env)
