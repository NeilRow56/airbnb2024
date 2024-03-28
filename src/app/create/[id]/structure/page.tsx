import { SelectCategory } from '@/components/SelectCategory'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StructureRoute() {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
        <form>
          <SelectCategory />
          <div className="fixed bottom-0 left-0  z-10 h-24 w-full border-t bg-white">
            <div className=" flex h-full items-center justify-between  px-5 lg:px-10">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button size="lg">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
