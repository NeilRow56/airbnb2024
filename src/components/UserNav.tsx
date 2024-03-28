import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { LogOut } from 'lucide-react'
import { createAirbnbHome } from '@/actions'

export default async function UserNav() {
  const session = await auth()
  const user = session?.user

  const createHomeWithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" text-primary">
        <Avatar className="mt-1 h-12 w-12">
          <AvatarImage src="/profile.jpg" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-blue-600">
        <DropdownMenuItem>
          <form action={createHomeWithId} className="w-full ">
            <button type="submit" text-start>
              Airbnb your Home
            </button>
          </form>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/my-homes">My Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/favorites">Favorites</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/reservations">Reservations</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="menuItem">
          <LogOut size={20} />
          <Link
            className=" tex-lg text-primary transition-colors hover:text-primary/70"
            href={'/api/auth/signout'}
          >
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
