import { cn } from '../../utils/cn'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[8px] bg-blue-base/30', className)}
      {...props}
    />
  )
}
