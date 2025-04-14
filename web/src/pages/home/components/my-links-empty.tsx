import IconLink from '../../assets/icon-link.svg'

export function MyLinksEmpty() {
  return (
    <div className="flex items-center justify-center flex-col ">
      <img src={IconLink} alt="ìcone" className="mt-4 mb-3" />
      <span className="text-gray-500 text-xs uppercase leading-3.5 font-normal">
        ainda não existe links cadastrados
      </span>
    </div>
  )
}
