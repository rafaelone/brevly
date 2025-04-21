import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import IconLogo from '../../assets/icon-logo.svg'
import { useRedirect } from './use-redirect'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const { getLinkByShortLink } = useRedirect()

  useEffect(() => {
    if (shortUrl) {
      getLinkByShortLink(shortUrl)
    }
  }, [getLinkByShortLink, shortUrl])

  return (
    <div className="h-dvh flex justify-center items-center max-lg:px-3">
      <div className="flex py-16 px-12 max-w-[580px] w-full flex-col gap-6 bg-gray-100 items-center justify-center max-lg:px-5 max-lg:px-12">
        <img src={IconLogo} alt="Brev.ly" className="size-12" />
        <span className="text-xl font-bold text-gray-600 leading-8">
          Redirecionando...
        </span>
        <div className="flex flex-col gap-1 items-center">
          <p className="leading-4.5 text-md text-gray-500 font-semibold text-center">
            O link será aberto automaticamente em alguns instantes.{' '}
          </p>
          <span className="leading-4.5 text-md text-gray-500 font-semibold">
            Não foi redirecionado? <a className="text-blue-base">Acesse aqui</a>
          </span>
        </div>
      </div>
    </div>
  )
}
