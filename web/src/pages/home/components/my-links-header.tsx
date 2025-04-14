import { ButtonWithIcon } from '../../../components/ui/button-with-icon'

export function MyLinksHeader() {
  return (
    <header className="flex items-center justify-between">
      <strong className="font-bold text-gray-600 text-lg leading-8">
        Meus links
      </strong>
      <ButtonWithIcon iconType="download" text="Baixar CSV" />
    </header>
  )
}
