import { AxiosError } from 'axios'

import { api } from './api-client'

type DeleteLinkParams = {
  id: string
}

export async function deleteLink({ id }: DeleteLinkParams) {
  try {
    await api.delete(`/link?id=${id}`)
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data.message,
      }
    }

    return {
      message: 'Erro ao apagar link',
    }
  }
}
