import { ButtonWithIcon } from '../../../components/ui/button-with-icon'

export function MyLinksItems() {
  return (
    <li className="flex items-center gap-4 max-lg:w-full">
      <a
        href="#"
        className="flex flex-col flex-1 gap-1 max-lg:max-w-[157px]"
        target="_blank"
      >
        <span className="font-bold text-md text-blue-base leading-4.5 truncate">
          brev.ly/Portfolio-Dev
        </span>
        <span className="leading-4 text-sm font-normal text-gray-500 truncate">
          devsite.portolio.com.br/devname-123456
        </span>
      </a>

      <span className="leading-4 text-sm font-normal text-gray-500 max-lg:ml-auto">
        30 acessos
      </span>
      <div className="flex items-center gap-1">
        <ButtonWithIcon iconType="copy" />
        <ButtonWithIcon iconType="trash" />
      </div>
    </li>
  )
}
