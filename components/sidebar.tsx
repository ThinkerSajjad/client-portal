"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LogOut, Plus, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface SidebarProps {
  activePage?: "tickets" | "documents" | "chat"
}

export function Sidebar({ activePage }: SidebarProps) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      // Set initial value
      checkIfMobile()
      
      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)
      
      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Initialize sidebar to be open on desktop and closed on mobile
  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const handleSignOut = async () => {
    await signOut()
    router.push("/sign-in")
  }

  return (
    <>
      {/* Toggle button for mobile */}
      <button 
        className={`fixed top-20 md:hidden z-30 bg-indigo-600 text-white p-2 rounded-r-md shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'left-64' : 'left-0'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 h-full transition-all min-w-80 duration-300 ease-in-out bg-white ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        } w-64 border-r overflow-hidden flex flex-col`}
      >
        <div className="p-4 flex items-center gap-2 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              D
            </div>
            <span className="font-bold text-xl">Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {user && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl || "/placeholder.svg"}
                        alt={user.fullName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-medium">
                        {user.firstName?.[0] || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName || "User"}</p>
                    <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="font-medium text-gray-700">Retainer Plan</h3>
              <p className="font-bold text-xl mb-2">30 tickets left</p>
              <Progress value={60} className="h-2 mb-3" />
              <Button variant="outline" className="w-full">
                Upgrade
              </Button>
            </div>

            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className={`block p-3 rounded-md ${!activePage ? "bg-gray-100" : "hover:bg-gray-100"}`}
              >
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/tickets"
                className={`block p-3 rounded-md ${activePage === "tickets" ? "bg-gray-100" : "hover:bg-gray-100"}`}
              >
                <span className="font-medium">Tickets</span>
              </Link>
              <Link
                href="/documents"
                className={`block p-3 rounded-md ${activePage === "documents" ? "bg-gray-100" : "hover:bg-gray-100"}`}
              >
                <span className="font-medium">Documents</span>
              </Link>
              <Link
                href="/chat"
                className={`block p-3 rounded-md ${activePage === "chat" ? "bg-gray-100" : "hover:bg-gray-100"}`}
              >
                <span className="font-medium">Chat</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t w-full">
          <Button variant="ghost" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Upgrade
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
