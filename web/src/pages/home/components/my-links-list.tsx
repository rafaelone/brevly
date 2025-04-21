import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'

import { fetchLinks } from '../../../http/fetch-links'
import { MyLinksEmpty } from './my-links-empty'
import { MyLinksItem } from './my-links-item'
import { MyLinksLoading } from './my-links-loading'

export function MyLinkList() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch-all-links'],
    queryFn: async () => {
      const data = await fetchLinks()
      return data
    },
  })

  if (isLoading) {
    return (
      <div>
        <MyLinksLoading />
      </div>
    )
  }

  if (!data?.links?.length) return <MyLinksEmpty />

  return (
    <div className="px-3 flex flex-col gap-3">
      <ScrollArea.Root type="scroll" className="overflow-hidden">
        <ScrollArea.Viewport className="max-h-[500px]">
          <ul className="flex flex-col">
            {data.links.map((link) => (
              <MyLinksItem
                key={link.id}
                id={link.id}
                originalLink={link.original_link}
                shortLink={link.short_link}
                accessCount={link.access_count}
              />
            ))}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-white-100 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
