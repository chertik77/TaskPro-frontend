import type { AddLabelDto } from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import { AddLabelDtoSchema, LabelDtoSchema, LabelsDtoSchema } from './contracts'
import { labelApiEndpoints } from './endpoints'

export const labelService = {
  async getAllLabels() {
    const response = await axiosInstance.get(labelApiEndpoints.root)

    const parsedData = parse(LabelsDtoSchema, response.data)

    return parsedData
  },

  async addLabel(data: AddLabelDto) {
    const addLabelDto = parse(AddLabelDtoSchema, data)

    const response = await axiosInstance.post(
      labelApiEndpoints.add,
      addLabelDto
    )

    const parsedData = parse(LabelDtoSchema, response.data)

    return parsedData
  }
}
