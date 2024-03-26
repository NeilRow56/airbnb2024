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

export default function UserNav() {
  return (
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
  )
}
