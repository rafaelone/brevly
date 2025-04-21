import { Skeleton } from '../../../components/ui/skeleton'

export function MyLinksLoading() {
  return (
    <div className="flex items-center gap-4 max-lg:w-full">
      <div className="flex flex-col flex-1 gap-1 max-lg:max-w-[157px]">
        <Skeleton className="max-w-[157px] h-[18px]" />
        <Skeleton className="max-w-[157px] h-[18px]" />
      </div>
      <Skeleton className="max-lg:ml-auto w-[60px] h-4" />
      <div className="flex items-center gap-1">
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
      </div>
    </div>
  )
}
