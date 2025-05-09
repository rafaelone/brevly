import { useNavigate } from 'react-router-dom'

import { getLink } from '../../http/get-link'

const useRedirect = () => {
  const navigate = useNavigate()

  const getLinkByShortLink = async (shortLink: string) => {
    const response = await getLink({ shortLink })

    if (response.link) {
      window.location.href = response.link.original_link
    } else {
      navigate(`/${shortLink}/not-found`)
    }
  }

  return {
    getLinkByShortLink,
  }
}

export { useRedirect }
