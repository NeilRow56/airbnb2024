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

export default function AddressPage() {
  const { getAllCountries } = useCountries()
  const [locationValue, setLocationValue] = useState('')
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="mb-10  text-3xl font-semibold tracking-tight transition-colors">
          Where is your home located
        </h2>
      </div>
      <form>
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
        </div>
      </form>
    </>
  )
}
