import { useNavigate } from 'react-router-dom'

import { getLink } from '../../http/get-link'

const useRedirect = () => {
  const navigate = useNavigate()
  const getLinkByShortLink = async (shortLink: string) => {
    const response = await getLink({ shortLink })
    console.log(response.link?.original_link)
    if (response.link) {
      window.location.href = response.link.original_link
    } else {
      navigate('/url/not-found')
    }
  }

  return {
    getLinkByShortLink,
  }
}

export { useRedirect }
