'use client'

import { CreateDescription } from '@/actions/home'
import { Counter } from '@/components/Counter'
import { CreationBottomBar } from '@/components/CreationBottomBar'
import { SingleImageDropzone } from '@/components/SingleImageDropzone'
import { Button } from '@/components/ui/button'

import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useMount from '@/hooks/useMount'
import { useEdgeStore } from '@/providers/edgestore'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DescriptionPage({
  params,
}: {
  params: { id: string }
}) {
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [imageIsDeleting, setImageIsDeleting] = useState(false)
  const mount = useMount()

  const handleImageDelete = async (imageUrl: string) => {
    setImageIsDeleting(true)
    await edgestore.publicFiles.delete({
      url: imageUrl,
    })

    setImageUrl('')
    toast.success('Image deleted')
    setImageIsDeleting(false)
  }

  if (!mount) return null

  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>
      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto mb-36 mt-10 flex w-3/5 flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Descrption</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per Night in GBP"
              min={10}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Guests</h3>
                  <p className="text-sm text-muted-foreground">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Rooms</h3>
                  <p className="text-sm text-muted-foreground">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Bathrooms</h3>
                  <p className="text-sm text-muted-foreground">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  )
}
