export {}

declare global {
  type HttpError = {
    status: number
    message: string
  }
}
