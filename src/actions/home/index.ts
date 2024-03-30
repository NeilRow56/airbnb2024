'use server'

import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

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
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`)
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`)
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`)
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    const data = await db.home.create({
      data: {
        userId: userId,
      },
    })

    return redirect(`/create/${data.id}/structure`)
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string
  const homeId = formData.get('homeId') as string
  const data = await db.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  })

  return redirect(`/create/${homeId}/description`)
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price')
  const imageFile = formData.get('image') as File
  const homeId = formData.get('homeId') as string

  const guestNumber = formData.get('guest') as string
  const roomNumber = formData.get('room') as string
  const bathroomsNumber = formData.get('bathroom') as string

  // const { data: imageData } = await supabase.storage
  //   .from("images")
  //   .upload(`${imageFile.name}-${new Date()}`, imageFile, {
  //     cacheControl: "2592000",
  //     contentType: "image/png",
  //   });

  const data = await db.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      // photo: imageData?.path,
      addedDescription: true,
    },
  })

  return redirect(`/create/${homeId}/address`)
}