import { ButtonWithIcon } from '../../../components/ui/button-with-icon'
import { useMyLinks } from './use-my-links'

type MyLinksItemsProps = {
  id: string
  originalLink: string
  shortLink: string
  accessCount: number
}

export function MyLinksItem({
  id,
  originalLink,
  shortLink,
  accessCount,
}: MyLinksItemsProps) {
  const { copyClypboard, handleDelete, handleUpdate } = useMyLinks()

  return (
    <>
      <li className="flex items-center gap-4 max-lg:w-full">
        <a
          href={shortLink}
          className="flex flex-col flex-1 gap-1 max-lg:max-w-[157px]"
          target="_blank"
          rel="noreferrer"
          onClick={() => handleUpdate(id)}
        >
          <span className="font-bold text-md text-blue-base leading-4.5 truncate">
            brev.ly/{shortLink}
          </span>
          <span className="leading-4 text-sm font-normal text-gray-500 truncate">
            {originalLink}
          </span>
        </a>

        <span className="leading-4 text-sm font-normal text-gray-500 max-lg:ml-auto">
          {accessCount} {`acesso${accessCount > 1 ? 's' : ''}`}
        </span>
        <div className="flex items-center gap-1">
          <ButtonWithIcon
            iconType="copy"
            onClick={() => copyClypboard(shortLink)}
          />
          <ButtonWithIcon iconType="trash" onClick={() => handleDelete(id)} />
        </div>
      </li>
      <hr className="border-t-1 border-gray-200 my-4" />
    </>
  )
}
