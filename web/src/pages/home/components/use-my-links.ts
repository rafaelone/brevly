import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createLink } from '../../../http/create-link'
import { deleteLink } from '../../../http/delete-link'
import { updateLink } from '../../../http/update-link'

const useMyLinks = () => {
  const queryClient = useQueryClient()

  const copyClypboard = async (shortLink: string) => {
    const initialUrl = window.location.origin

    await navigator.clipboard.writeText(`${initialUrl}/${shortLink}`)
    toast.success('Link copiado com sucesso!')
  }

  const handleDelete = async (linkId: string) => {
    const confirmed = window.confirm(
      'Você tem certeza que deseja excluir este link?',
    )

    if (confirmed) {
      await deleteLink({ id: linkId })
      toast.success('Link deletado com sucesso!')
      queryClient.invalidateQueries(['fetch-all-links'])
    }
  }

  const handleCreate = async (originalLink: string, shortLink: string) => {
    await createLink({ originalLink, shortLink })
    queryClient.invalidateQueries(['fetch-all-links'])
    toast.success('Link criado com sucesso!')
  }

  const handleUpdate = async (id: string) => {
    await updateLink({ id })
    queryClient.invalidateQueries(['fetch-all-links'])
  }

  return {
    copyClypboard,
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}

export { useMyLinks }
