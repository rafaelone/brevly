import { AxiosError } from 'axios'

import { api } from './api-client'

type CreateLinkParams = {
  originalLink: string
  shortLink: string
}

export async function createLink({
  originalLink,
  shortLink,
}: CreateLinkParams) {
  try {
    await api.post(`/link`, {
      original_link: originalLink,
      short_link: shortLink,
    })
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data.message,
      }
    }

    return {
      message: 'Erro ao criar o link',
    }
  }
}
