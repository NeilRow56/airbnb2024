import Image from 'next/image'
import Link from 'next/link'
import DeskTopLogo from '../../public/airbnb-desktop.png'
import MobileLogo from '../../public/airbnb-mobile.webp'

import { ThemeToggle } from './dashboard-layout/ThemeToggle'
import { Button } from './ui/button'
import UserNav from './UserNav'

export default function Navbar() {
  const user = 'Tommy'
  return (
    <nav className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between px-5 py-2 lg:px-10">
        <div>
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

        <div className="px+5 rounded-full border py-2">
          <h1 className="px-5">Hello from the search</h1>
        </div>
        <div className="flex  items-center justify-center space-x-4">
          <div className="">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="flex w-full">
              <div className=" space-x-2">
                <UserNav />
              </div>
              <div className="pt-4">
                <Button asChild size="sm" className="ml-4  px-6 ">
                  <Link href="/login">{user}</Link>
                </Button>
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
