import { MyLinksHeader } from './my-links-header'
import { MyLinkList } from './my-links-list'

export function MyLinks() {
  return (
    <div className="max-w-[580px] w-full bg-white-100 rounded-3xl p-8 flex flex-col max-lg:max-w-full max-lg:p-6">
      <MyLinksHeader />
      <hr className="border-t-1 border-gray-200 mt-4 mb-3" />
      <MyLinkList />
    </div>
  )
}
