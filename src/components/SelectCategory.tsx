'use client'

import { categoryItems } from '@/lib/categoryItems'
import { Card, CardHeader } from './ui/card'
import Image from 'next/image'
import { useState } from 'react'

export function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  return (
    <div className="mx-auto mb-36 mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {categoryItems.map((item) => {
        return (
          <div key={item.id} className="cursor-pointer">
            <Card
              onClick={() => setSelectedCategory(item.name)}
              className={
                selectedCategory === item.name ? 'border-2 border-primary ' : ''
              }
            >
              <CardHeader>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  height={32}
                  width={32}
                  className="h-8 w-8"
                />
                <h3 className=" font-medium">{item.title}</h3>
              </CardHeader>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
