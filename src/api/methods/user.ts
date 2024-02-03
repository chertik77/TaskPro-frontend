import { alovaInstance } from 'api'
import { API_ENDPOINTS } from 'config/api-endpoints'

//TODO: Add proper type for data through valibot schema
export const signup = (data: undefined) =>
  alovaInstance.Post(API_ENDPOINTS.signup, data)

export const signin = (data: undefined) =>
  alovaInstance.Post(API_ENDPOINTS.signin, data)

export const current = (data: undefined) =>
  alovaInstance.Post(API_ENDPOINTS.current, data)
