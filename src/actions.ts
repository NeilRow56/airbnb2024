'use server'

import { redirect } from 'next/navigation'
import { db } from './lib/db'

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await db.home.findFirst({
    where: {
      userId: userId,
    },

    orderBy: {
      createdAT: 'desc',
    },
  })

  if (data === null) {
    const data = await db.home.create({
      data: {
        userId: userId,
      },
    })

    return redirect(`/create/${data.id}/structure`)
  }
}
