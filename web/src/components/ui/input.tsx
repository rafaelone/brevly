import { TriangleAlert } from 'lucide-react'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  hasPrefix?: boolean
  label: string
  htmlFor: string
  errorMessage?: string
}

export function Input({
  label,
  htmlFor,
  hasPrefix = false,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <div className="group" data-haserror={!!errorMessage}>
      <label
        htmlFor={htmlFor}
        className="font-normal text-xs leading-3.5 uppercase text-gray-500 group-focus-within:text-blue-base group-focus-within:font-semibold group-data-[haserror=true]:text-danger-100 group-data-[haserror=true]:font-semibold"
      >
        {label}
      </label>
      <div className="bg-white-100 mt-2 rounded-[8px] border group-focus-within:border-blue-base focus-within:border-[1.5px] border-gray-300 max-w-[352px] h-12 flex items-center px-4 group-data-[haserror=true]:border-[1.5px] group-data-[haserror=true]:border-danger-100 max-lg:max-w-full">
        {hasPrefix && (
          <span className="text-md font-regular text-gray-600 normal-case">
            brev.ly/
          </span>
        )}
        <input
          className="bg-transparent h-full text-md leading-4.5 text-gray-600 placeholder:text-gray-400 w-full outline-none font-normal "
          {...rest}
        />
      </div>
      {errorMessage && (
        <span className="gap-2 flex items-center text-sm text-gray-500 leading-4 font-normal mt-2">
          <TriangleAlert className="size-4 text-danger-100" />
          {errorMessage}
        </span>
      )}
    </div>
  )
}
