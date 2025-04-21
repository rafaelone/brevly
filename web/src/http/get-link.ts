import { AxiosError } from 'axios'

import { api } from './api-client'

type GetLinkParams = {
  shortLink: string
}

export async function getLink({ shortLink }: GetLinkParams) {
  try {
    const response = await api.get<{ link: { original_link: string } }>(
      `/link?short_link=${shortLink}`,
    )

    return {
      link: response.data.link,
    }
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
