import { ButtonWithIcon } from '../../../components/ui/button-with-icon'
import { useMyLinks } from './use-my-links'

export function MyLinksCSV() {
  const { handleDownload, downloading } = useMyLinks()

  return (
    <ButtonWithIcon
      iconType="download"
      text="Baixar CSV"
      isLoading={downloading}
      disabled={downloading}
      onClick={handleDownload}
    />
  )
}
