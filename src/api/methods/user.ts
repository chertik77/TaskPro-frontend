//TODO: Add proper type for data through valibot schema
// export const signup = (data: undefined) =>
//   alovaInstance.Post(API_ENDPOINTS.signup, data)

import { alovaInstance } from 'api'

export const signin = (data: undefined) => alovaInstance.Post('signin', data)

// export const current = (data: undefined) =>
//   alovaInstance.Post(API_ENDPOINTS.current, data)
