export function isHttpError(error: unknown): error is HttpError {
  return (
    error instanceof Object &&
    'status' in error &&
    'message' in error &&
    typeof error.status === 'number'
  )
}
