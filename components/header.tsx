"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"
import { useClerk, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/sign-in")
  }

  return (
    <div className="border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-medium">{title}</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="relative group">
          <Avatar className="cursor-pointer">
            {user?.imageUrl ? (
              <AvatarImage src={user.imageUrl || "/placeholder.svg"} alt={user.fullName || "User"} />
            ) : (
              <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
            )}
          </Avatar>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium">{user?.fullName || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
