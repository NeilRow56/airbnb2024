'use client'

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
      <form>
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

          <div className=" hidden flex-col gap-y-2">
            <Label>Image</Label>
            <Input className="" name="imageUrl" type="text" />
            {imageUrl}
          </div>

          <div className="flex justify-center">
            {imageUrl ? (
              <>
                <div className="relative mt-4 max-h-[400px] min-h-[200px] min-w-[200px] max-w-[400px]">
                  <Image
                    fill
                    src={imageUrl}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt=" Image"
                    className="object-contain"
                  />
                  <Button
                    onClick={() => handleImageDelete(imageUrl)}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-[-12px] top-0"
                  >
                    {imageIsDeleting ? <Loader2 /> : <XCircle />}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <h2 className="px-6 text-primary">Single Image Upload</h2>
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    value={file}
                    onChange={(file) => {
                      setFile(file)
                    }}
                  />
                  {progress > 0 && (
                    <div className="mx-auto h-[6px] w-44 overflow-hidden rounded border">
                      <div
                        className="duration 150 h-full bg-blue-600 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-primary text-primary"
                    onClick={async () => {
                      if (file) {
                        const res = await edgestore.publicFiles.upload({
                          file,
                          onProgressChange: (progress) => {
                            // you can use this to show a progress bar
                            setProgress(progress)
                          },
                        })
                        // you can run some server action or api here
                        // to add the necessary data to your database

                        setImageUrl(res?.url)
                        toast.success('Upload Complete')
                      }
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </>
            )}
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
