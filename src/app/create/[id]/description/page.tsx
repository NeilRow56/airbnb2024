'use client'

import { Counter } from '@/components/Counter'
import { CreationBottomBar } from '@/components/CreationBottomBar'
import { SingleImageDropzone } from '@/components/SingleImageDropzone'

import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEdgeStore } from '@/providers/edgestore'
import { useState } from 'react'

export default function DescriptionPage({
  params,
}: {
  params: { id: string }
}) {
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()
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

          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          <div className="flex justify-center">
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
              <button
                onClick={async () => {
                  if (file) {
                    const res = await edgestore.publicFiles.upload({
                      file,
                      onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                        console.log(progress)
                      },
                    })
                    // you can run some server action or api here
                    // to add the necessary data to your database
                    console.log(res)
                  }
                }}
              >
                Upload
              </button>
            </div>
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
