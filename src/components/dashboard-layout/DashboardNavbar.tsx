import { Button } from '../ui/button'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function DashboardNavbar() {
  // Holding userId ready for auth
  const user = 'Tommy'

  var myDate = new Date()
  var hrs = myDate.getHours()

  var greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'

  return (
    <div className="flex h-14 w-full items-center border border-gray-600  bg-white  px-2 dark:bg-neutral-950 md:px-12  lg:px-48">
      <div className="justify-cstart flex flex-1">
        <div>
          <p className="text-xl text-primary">{greet}</p>
        </div>
      </div>
      <div className=" flex  gap-6">
        <ThemeToggle />
        {user ? (
          <div className="flex w-full">
            <div className=" space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger className=" text-primary">
                  <Avatar className="mt-2 h-12 w-12">
                    <AvatarImage src="/profile.jpg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Avatar className="h-12 w-12 ">
                      <AvatarImage src="/profile.jpg" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/hotel/new">New</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/edgestore">edgestore</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
  )
}

export default DashboardNavbar
