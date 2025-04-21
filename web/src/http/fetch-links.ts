import { AxiosError } from 'axios'

import type { Link } from '../@types'
import { api } from './api-client'

export async function fetchLinks() {
  try {
    const response = await api.get<{ links: Link[] }>('/links')
    return response.data.links
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response)
    }
  }
}
