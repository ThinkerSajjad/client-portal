"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, File } from "lucide-react"
import { TicketFileUpload } from "@/components/ticket-file-upload"
import { TicketLimitWarning } from "@/components/ticket-limit-warning"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { Toaster } from "@/components/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

export default function Dashboard() {
  const [isTicketLoading, setIsTicketLoading] = useState(false)
  const [ticketLimitWarningOpen, setTicketLimitWarningOpen] = useState(false)
  const [ticketAttachments, setTicketAttachments] = useState<string[]>([])
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useUser()

  const simulateTicketLoading = () => {
    setIsTicketLoading(true)
    setTimeout(() => setIsTicketLoading(false), 2000)
  }

  const handleSubmitTicket = () => {
    // Check if we should show the ticket limit warning
    if (Math.random() > 0.5) {
      setTicketLimitWarningOpen(true)
      return
    }

    simulateTicketLoading()

    setTimeout(() => {
      toast({
        title: "Ticket submitted",
        description: "Your ticket has been successfully submitted.",
        variant: "success",
      })

      // Clear form and attachments
      setTicketAttachments([])

      // Reset form fields
      const titleInput = document.getElementById("ticket-title") as HTMLInputElement
      const descriptionInput = document.getElementById("ticket-description") as HTMLTextAreaElement
      if (titleInput) titleInput.value = ""
      if (descriptionInput) descriptionInput.value = ""

      // Navigate to tickets page after successful submission
      setTimeout(() => {
        router.push("/tickets")
      }, 1500)
    }, 2000)
  }

  const handleTicketFileUploaded = (fileUrl: string, fileName: string) => {
    setTicketAttachments([...ticketAttachments, fileName])
  }

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full h-full max-w-[84rem] bg-white rounded-xl shadow-sm flex flex-col md:flex-row relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-6 flex flex-col overflow-hidden">
          {/* Header */}
          <Header title={`Welcome, ${user?.firstName || "Client"}`} />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Create Ticket */}
              <div className="border rounded-lg p-6">
                {isTicketLoading ? (
                  <SkeletonLoader type="ticket" />
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-6">Create Design & Development Ticket</h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input id="ticket-title" type="text" className="w-full px-3 py-2 border rounded-md" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          id="ticket-description"
                          className="w-full px-3 py-2 border rounded-md h-24"
                        ></textarea>
                      </div>

                      <div>
                        <TicketFileUpload onFileUploaded={handleTicketFileUploaded} />

                        {ticketAttachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {ticketAttachments.map((fileName, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <File className="h-4 w-4 mr-2" />
                                {fileName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSubmitTicket}>
                        Submit Ticket
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => router.push("/documents")}
                    >
                      <span>View All Documents</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => router.push("/tickets")}
                    >
                      <span>View All Tickets</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" onClick={() => router.push("/chat")}>
                      <span>Open Chat Support</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <File className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">New document uploaded</p>
                        <p className="text-sm text-gray-500">Invoice.pdf was added</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Ticket resolved</p>
                        <p className="text-sm text-gray-500">Logo design feedback addressed</p>
                        <p className="text-xs text-gray-400">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs and Toasts (positioned absolutely) */}
      <div className="absolute bottom-0 right-0 z-50">
        <Toaster />
      </div>
      
      <TicketLimitWarning
        isOpen={ticketLimitWarningOpen}
        onClose={() => setTicketLimitWarningOpen(false)}
        remainingTickets={5}
      />
    </div>
  )
}
