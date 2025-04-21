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
    console.log(err)
    if (err instanceof AxiosError) {
      console.log(err.response)
    }
  }
}
