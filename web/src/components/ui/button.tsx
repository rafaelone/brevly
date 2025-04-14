import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'max-w-[352px] leading-4.5 w-full h-12 rounded-xl text-white-100 bg-blue-base text-md font-semibold transition-colors hover:bg-blue-dark disabled:bg-blue-base/50 max-lg:max-w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
