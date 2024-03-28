'use client'

import { categoryItems } from '@/lib/categoryItems'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function MapFilterItems() {
  const searchParams = useSearchParams()
  const search = searchParams.get('filter')

  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="no-scrollbar mt-5 flex w-full justify-between gap-x-10 overflow-x-scroll">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + '?' + createQueryString('filter', item.name)}
          className={cn(
            search === item.name
              ? 'flex-shrink-0 border-b-2 border-primary pb-2'
              : 'flex-shrink-0 opacity-70',
            'flex flex-col items-center gap-y-3'
          )}
        >
          <div className="relative h-6 w-6">
            <Image
              width={24}
              height={24}
              className="h-6 w-6"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  )
}
