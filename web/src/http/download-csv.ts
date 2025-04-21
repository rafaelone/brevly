import { api } from './api-client'

export async function downloadCSV() {
  const response = await api.get<{ url: string }>('/links/csv')
  return { url: response.data.url }
}
