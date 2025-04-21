import { AxiosError } from 'axios'

import type { Link } from '../@types'
import { api } from './api-client'

export async function fetchLinks() {
  try {
    const response = await api.get<{ links: Link[] }>('/links')
    return { links: response.data.links }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data.message,
      }
    }

    return {
      message: 'Erro ao tentar carregar os links',
    }
  }
}
