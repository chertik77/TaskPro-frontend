import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { BaseIssue } from 'valibot'

import { AxiosError } from 'axios'

export class AxiosValidationError<T = unknown, D = unknown> extends AxiosError {
  static readonly ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION'

  constructor(
    config?: InternalAxiosRequestConfig<D>,
    request?: unknown,
    response?: AxiosResponse<T, D>,
    readonly errors?: [BaseIssue<unknown>, ...BaseIssue<unknown>[]]
  ) {
    super(
      'The provided data does not meet the required criteria.',
      AxiosValidationError.ERR_BAD_VALIDATION,
      config,
      request,
      response
    )
  }
}
