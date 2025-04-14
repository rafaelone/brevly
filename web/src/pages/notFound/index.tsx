import Icon404 from '../../assets/404.svg'

export function NotFound() {
  return (
    <div className="h-dvh flex justify-center items-center max-lg:px-3">
      <div className="flex py-16 px-12 max-w-[580px] w-full flex-col gap-6 bg-gray-100 items-center justify-center max-lg:px-5 max-lg:px-12">
        <img src={Icon404} alt="Página não encontrada" />
        <span className="text-xl font-bold text-gray-600 leading-8">
          Link não encontrado
        </span>
        <div className="flex flex-col gap-1 items-center">
          <p className="leading-4.5 text-md text-gray-500 font-semibold text-center">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{' '}
            <a href="/" className="text-blue-base">
              brev.ly.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
