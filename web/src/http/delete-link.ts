import { AxiosError } from 'axios'

import { api } from './api-client'

type DeleteLinkParams = {
  id: string
}

export async function deleteLink({ id }: DeleteLinkParams) {
  try {
    await api.delete(`/link?id=${id}`)
  } catch (err) {
    console.log(err)
    if (err instanceof AxiosError) {
      console.log(err.response)
    }
  }
}
