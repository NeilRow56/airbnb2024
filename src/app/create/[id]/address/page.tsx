'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCountries } from '@/lib/getCountries'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { CreationBottomBar } from '@/components/CreationBottomBar'
import { createLocation } from '@/actions/home'

export default function AddressPage({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries()
  const [locationValue, setLocationValue] = useState('')

  const LazyMap = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  })
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="mb-10  text-3xl font-semibold tracking-tight transition-colors">
          Where is your home located
        </h2>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="mx-auto mb-36 w-3/5">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  )
}
