import type { EditUserDto, HelpDto } from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import { EditUserDtoSchema, HelpDtoSchema, UserDtoSchema } from './contracts'
import { userApiEndpoints } from './endpoints'

export const userService = {
  async askForHelp(data: HelpDto) {
    const helpDto = parse(HelpDtoSchema, data)

    await axiosInstance.post(userApiEndpoints.help, helpDto)
  },

  async editUser(data: EditUserDto) {
    const editUserDto = parse(EditUserDtoSchema, data)

    const response = await axiosInstance.patch(
      userApiEndpoints.root,
      editUserDto,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  },

  async getMe() {
    const response = await axiosInstance.get(userApiEndpoints.me, {
      headers: { 'Cache-Control': 'no-store' },
      validateStatus: status => status < 500
    })

    if (response.status === 401) return null

    const parsedData = parse(UserDtoSchema, response.data)

    return parsedData
  }
}
