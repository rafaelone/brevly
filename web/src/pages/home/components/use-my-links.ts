import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { createLink } from '../../../http/create-link'
import { deleteLink } from '../../../http/delete-link'
import { downloadCSV } from '../../../http/download-csv'
import { updateLink } from '../../../http/update-link'

const useMyLinks = () => {
  const [downloading, setDownloading] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const copyClypboard = async (shortLink: string) => {
    const initialUrl = window.location.origin

    await navigator.clipboard.writeText(`${initialUrl}/${shortLink}`)
    toast.info(`Link copiado com sucesso`, {
      description: `O link ${shortLink} foi copiado para a área de transferência`,
    })
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
    const response = await createLink({ originalLink, shortLink })

    if (response) {
      toast.error(response.message)
      return
    }

    toast.success('Link criado com sucesso!')
    queryClient.invalidateQueries(['fetch-all-links'])
  }

  const handleUpdate = async (id: string) => {
    await updateLink({ id })
    queryClient.invalidateQueries(['fetch-all-links'])
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const response = await downloadCSV()
      const link = document.createElement('a')
      link.href = response.url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch {
      toast.error('Erro ao baixar o CSV')
    } finally {
      setDownloading(false)
    }
  }

  return {
    downloading,
    copyClypboard,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDownload,
  }
}

export { useMyLinks }
