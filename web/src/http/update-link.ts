import { AxiosError } from 'axios'

import { api } from './api-client'

type UpdateLinkParams = {
  id: string
}

export async function updateLink({ id }: UpdateLinkParams) {
  try {
    await api.put(`/link?id=${id}`)
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data.message,
      }
    }

    return {
      message: 'Erro ao atualizar link',
    }
  }
}
