"use client"
import { Toaster } from "@/components/toaster"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the document details based on the ID
  // For now, we'll use mock data
  const documentDetails = {
    name: "Wireframe.pdf",
    type: "PDF",
    description: "Initial wireframe for the landing page layout.",
    uploadedDate: "Apr 16",
    size: "123 KB",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto bg-white shadow-sm max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar activePage="documents" />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <Header title="Document Details" />

            {/* Content */}
            <div className="p-6 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{documentDetails.name}</h1>
                  <p className="text-gray-500">{documentDetails.type}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-gray-700">{documentDetails.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Uploaded</h3>
                      <p>{documentDetails.uploadedDate}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Size</h3>
                      <p>{documentDetails.size}</p>
                    </div>
                  </div>
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Open</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
