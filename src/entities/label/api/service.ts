import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import { LabelsDtoSchema } from './contracts'
import { labelApiEndpoints } from './endpoints'

export const labelService = {
  async getAllLabels() {
    const response = await axiosInstance.get(labelApiEndpoints.root)

    const parsedData = parse(LabelsDtoSchema, response.data)

    return parsedData
  }
}
