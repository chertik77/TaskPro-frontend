import type { AxiosResponse } from 'axios'
import type { BaseIssue, BaseSchema } from 'valibot'

import { AxiosHeaders } from 'axios'
import { safeParse } from 'valibot'

import { AxiosValidationError } from './axios-validation-error'

export const axiosValidators = {
  validateResponse<I>(
    schema: BaseSchema<I, I, BaseIssue<unknown>>,
    response: AxiosResponse<unknown>
  ): AxiosResponse<I> {
    const validation = safeParse(schema, response.data)

    if (!validation.success) {
      throw new AxiosValidationError(
        response.config,
        response.request,
        response,
        validation.issues
      )
    }

    return { ...response, data: validation.output }
  },

  validateRequest<I, O>(
    schema: BaseSchema<I, O, BaseIssue<unknown>>,
    data: unknown
  ): O {
    const validation = safeParse(schema, data)

    if (!validation.success) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.issues
      )
    }

    return validation.output
  }
}
