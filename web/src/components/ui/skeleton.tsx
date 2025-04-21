import { cn } from '../../utils/cn'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-blue-base/30', className)}
      {...props}
    />
  )
}
