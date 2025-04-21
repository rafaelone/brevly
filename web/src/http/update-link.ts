import { AxiosError } from 'axios'

import { api } from './api-client'

type UpdateLinkParams = {
  id: string
}

export async function updateLink({ id }: UpdateLinkParams) {
  try {
    await api.put(`/link?id=${id}`)
  } catch (err) {
    console.log(err)
    if (err instanceof AxiosError) {
      console.log(err.response)
    }
  }
}
