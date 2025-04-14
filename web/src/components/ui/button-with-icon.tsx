import type { ComponentProps } from 'react'

import IconCopy from '../../assets/icon-copy.svg'
import IconDownload from '../../assets/icon-download.svg'
import IconTrash from '../../assets/icon-trash.svg'

type ButtonWithIcon = ComponentProps<'button'> & {
  text?: string
  iconType: 'download' | 'copy' | 'trash'
}

export function ButtonWithIcon({ text, iconType, ...rest }: ButtonWithIcon) {
  let button = null

  switch (iconType) {
    case 'copy':
      button = (
        <button
          className="w-8 h-8 rounded-[8px] border border-gray-200 bg-gray-200 flex items-center justify-center hover:border hover:border-blue-base transition-colors "
          {...rest}
        >
          <img src={IconCopy} alt="ícone de copiar" />
        </button>
      )
      break
    case 'download':
      button = (
        <button
          className="bg-gray-200 leading-4 text-sm font-semibold h-8 px-2 rounded-md text-gray-500 flex border border-gray-200 items-center gap-1.5 hover:border hover:border-blue-base disabled:opacity-50"
          {...rest}
        >
          <img src={IconDownload} alt="ícone de copiar" />
          {text}
        </button>
      )
      break
    case 'trash':
      button = (
        <button
          className="bg-gray-200 leading-4 text-sm font-semibold h-8 px-2 rounded-md text-gray-500 flex border border-gray-200 items-center gap-1.5 hover:border hover:border-blue-base disabled:opacity-50"
          {...rest}
        >
          <img src={IconTrash} alt="ícone de copiar" />
          {text}
        </button>
      )
      break
    default:
      button = null
      break
  }

  return button
}
