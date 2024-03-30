import { createCategoryPage } from '@/actions/home'
import { CreationBottomBar } from '@/components/CreationBottomBar'

import { SelectCategory } from '@/components/SelectCategory'

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
        <form action={createCategoryPage}>
          <input type="hidden" name="homeId" value={params.id} />
          <SelectCategory />
          <CreationBottomBar />
        </form>
      </div>
    </>
  )
}
