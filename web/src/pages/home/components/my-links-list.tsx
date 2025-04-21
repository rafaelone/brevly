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

  if (!data?.length) return <MyLinksEmpty />

  return (
    <ul className="flex flex-col">
      {data.map((link) => (
        <MyLinksItem
          key={link.id}
          id={link.id}
          originalLink={link.original_link}
          shortLink={link.short_link}
          accessCount={link.access_count}
        />
      ))}
    </ul>
  )
}
