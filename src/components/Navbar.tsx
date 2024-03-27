import Image from 'next/image'
import Link from 'next/link'
import DeskTopLogo from '../../public/airbnb-desktop.png'
import MobileLogo from '../../public/airbnb-mobile.webp'

import { ThemeToggle } from './dashboard-layout/ThemeToggle'
import { Button } from './ui/button'
import UserNav from './UserNav'
import { auth } from '@/lib/auth'

export default async function Navbar() {
  const session = await auth()
  const user = session?.user
  return (
    <nav className="fixed top-0 z-50  w-full border-b">
      <div className="container mx-auto flex items-center justify-between px-5 py-2 lg:px-10">
        <div className="">
          <Link href="/dashboard">
            <Image
              src={DeskTopLogo}
              alt="Airbnb logo"
              className="hidden w-32 lg:block"
            />
            <Image
              src={MobileLogo}
              alt="Airbnb mobile logo"
              className="block w-12 lg:hidden"
            />
          </Link>
        </div>

        <div className="hidden rounded-full border px-5 py-2 sm:block">
          <h1 className="px-2">Hello from the search</h1>
        </div>
        <div className="flex  items-center justify-center space-x-4">
          <div className="">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="flex w-full items-center">
              <div className=" space-x-2">
                <UserNav />
              </div>
              <div className="ml-4 flex flex-col rounded-md bg-primary px-2">
                <Link className="text-sm text-gray-200" href="/login">
                  {user.firstName}{' '}
                </Link>
                <div>
                  <span className="text-xs text-muted">Logged in</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Button asChild size="sm" className="px-6  ">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
