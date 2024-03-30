'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useImage } from '@/hooks/use-image'
import { SingleImageDropzone } from '@/components/SingleImageDropzone'
import { useState } from 'react'
import { useEdgeStore } from '@/providers/edgestore'
import { toast } from 'sonner'

export const ImageModal = () => {
  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const descriptionImage = useImage()
  const { edgestore } = useEdgeStore()

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    descriptionImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
      })
      setFileUrl(res?.url)
      toast.success('Upload Comp[lete')
      onClose()
    }
  }

  return (
    <Dialog
      open={descriptionImage.isOpen}
      onOpenChange={descriptionImage.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Property Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
