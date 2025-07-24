import * as v from 'valibot'

export const GoogleCallbackSearchSchema = v.object({
  code: v.pipe(v.string(), v.minLength(1))
})
