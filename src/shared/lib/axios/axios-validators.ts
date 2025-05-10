import type { AxiosResponse } from 'axios'
import type { GenericSchema } from 'valibot'

import { AxiosHeaders } from 'axios'
import { safeParse } from 'valibot'

import { AxiosValidationError } from './axios-validation-error'

export const axiosValidators = {
  validateResponse<I>(
    schema: GenericSchema<I>,
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

  validateRequest<I, O>(schema: GenericSchema<I, O>, data: unknown): O {
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
