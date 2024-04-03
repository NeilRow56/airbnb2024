import { ListingCard } from '@/components/ListingCard'
import MapFilterItems from '@/components/MapFilterItems'
import { db } from '@/lib/db'

async function getData() {
  const data = await db.home.findMany({
    where: {
      addedDescription: true,
      addedLoaction: true,
      addedCategory: true,
    },
    select: {
      id: true,
      price: true,
      description: true,
    },
  })

  return data
}

export default async function LandingPage() {
  const data = await getData()
  return (
    <section className="container mx-auto px-5  pt-2 lg:px-10 ">
      <MapFilterItems />
      <div>
        {data.map((item) => (
          <ListingCard key={item.id} />
        ))}
      </div>
    </section>
  )
}
