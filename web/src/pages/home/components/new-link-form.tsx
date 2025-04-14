import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

export function NewLinkForm() {
  return (
    <div className="max-w-[380px] w-full bg-white-100 rounded-3xl p-8 gap-6 flex flex-col max-lg:max-w-full max-lg:p-6 max-lg:gap-4">
      <strong className="text-lg leading-6 font-boldh text-gray-600">
        Novo Link
      </strong>
      <form className="w-full flex flex-col gap-4">
        <Input
          htmlFor="original_link"
          label="Link Original"
          id="original_link"
          placeholder="https://exemplo.com.br"
        />
        <Input
          htmlFor="short_link"
          label="Link Encurtado"
          id="short_link"
          hasPrefix
          prefix="brev.ly/"
        />
        <Button className="mt-1">Salvar link</Button>
      </form>
    </div>
  )
}
