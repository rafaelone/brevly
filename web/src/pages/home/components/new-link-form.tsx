import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useMyLinks } from './use-my-links'

const regexToShortLink = /^(?!.*(https?:\/\/|\.com|\.br)).+$/i
const regexToOriginalLink = /^https?:\/\/.*(\.com|\.br)(\/.*)?$/g

const linkSchema = z.object({
  original_link: z
    .string()
    .url('URL inválida')
    .refine((val) => regexToOriginalLink.test(val), {
      message: 'Link original precisa conter .com ou .br',
    }),

  short_link: z
    .string()
    .min(1, 'Link encurtado obrigatório')
    .refine((val) => regexToShortLink.test(val), {
      message: 'Link encurtado não pode conter https://, .com ou .br',
    }),
})

type LinkType = z.infer<typeof linkSchema>

export function NewLinkForm() {
  const { handleCreate } = useMyLinks()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkType>({ resolver: zodResolver(linkSchema) })

  async function onSubmit(data: LinkType) {
    await handleCreate(data.original_link, data.short_link)
    reset()
  }

  return (
    <div className="max-w-[380px] w-full bg-white-100 rounded-3xl p-8 gap-6 flex flex-col max-lg:max-w-full max-lg:p-6 max-lg:gap-4">
      <strong className="text-lg leading-6 font-boldh text-gray-600">
        Novo Link
      </strong>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          htmlFor="original_link"
          label="Link Original"
          id="original_link"
          placeholder="https://exemplo.com.br"
          errorMessage={errors.original_link?.message}
          {...register('original_link')}
        />
        <Input
          htmlFor="short_link"
          label="Link Encurtado"
          id="short_link"
          hasPrefix
          prefix="brev.ly/"
          errorMessage={errors.short_link?.message}
          {...register('short_link')}
        />
        <Button className="mt-1" disabled={isSubmitting} type="submit">
          Salvar link
        </Button>
      </form>
    </div>
  )
}
