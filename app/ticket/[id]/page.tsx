"use client"
import { FileText } from "lucide-react"
import { Toaster } from "@/components/toaster"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the ticket details based on the ID
  // For now, we'll use mock data
  const ticketDetails = {
    id: params.id,
    title: "Landing page development",
    status: "In Progress",
    submittedDate: "Apr 16",
    description:
      "We need a new landing page designed and developed to promote our latest product. The page should be modern, responsive, and optimized for conversions.",
    attachments: [{ name: "Wireframe.pdf", size: "123 KB" }],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto bg-white shadow-sm max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar activePage="tickets" />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <Header title="Ticket Details" />

            {/* Content */}
            <div className="p-6 max-w-4xl">
              <div className="mb-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  {ticketDetails.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{ticketDetails.title}</h1>
                    <p className="text-sm text-gray-500">New</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Details</h2>
                      <p className="text-gray-700">{ticketDetails.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <p className="font-medium">{ticketDetails.status}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted</h3>
                    <p>{ticketDetails.submittedDate}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Attachments</h3>
                    {ticketDetails.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 mt-2">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
