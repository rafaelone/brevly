import BrevLyImage from '../../assets/Logo.svg'
import { MyLinks } from './components/my-links'
import { NewLinkForm } from './components/new-link-form'

export function Home() {
  return (
    <main className="flex h-dvh w-full gap-8 pt-[88px]  max-w-[980px] flex-col mx-auto max-lg:items-center max-lg:p-3 max-lg:gap-6 max-lg:pt-8">
      <img src={BrevLyImage} alt="Brev.ly" className="w-[96px] h-6" />
      <div className="flex w-full gap-5 items-start max-lg:flex-col max-lg:gap-3">
        <NewLinkForm />
        <MyLinks />
      </div>
    </main>
  )
}
