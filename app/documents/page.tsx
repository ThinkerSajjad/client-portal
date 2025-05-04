"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, File, FileIcon } from "lucide-react"
import { DocumentUploadDialog } from "@/components/document-upload-dialog"
import { DeleteDocumentDialog } from "@/components/delete-document-dialog"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { Toaster } from "@/components/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DocumentsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState("")
  const { toast } = useToast()

  const [documents, setDocuments] = useState([
    { name: "Project Brief.pdf", type: "pdf", icon: "pdf" },
    { name: "Style Guide.pdf", type: "pdf", icon: "pdf" },
    { name: "Logo Design Final.sketch", type: "sketch", icon: "sketch" },
    { name: "Design Feedback.txt", type: "txt", icon: "txt" },
    { name: "Invoice.pdf", type: "pdf", icon: "pdf" },
  ])

  const handleDeleteDocument = (documentName: string) => {
    setDocumentToDelete(documentName)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteDocument = () => {
    setDocuments(documents.filter((doc) => doc.name !== documentToDelete))
    toast({
      title: "Document deleted",
      description: `${documentToDelete} has been successfully deleted.`,
      variant: "success",
    })
  }

  const handleDocumentClick = (document: any) => {
    // In a real app, this would navigate to the document detail page
    // For now, we'll just show a toast
    toast({
      title: "Opening document",
      description: `Opening ${document.name}`,
    })
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="text-red-500">
            <FileText className="h-6 w-6" />
          </div>
        )
      case "sketch":
        return (
          <div className="text-orange-500">
            <FileIcon className="h-6 w-6" />
          </div>
        )
      case "txt":
        return (
          <div className="text-blue-500">
            <File className="h-6 w-6" />
          </div>
        )
      default:
        return (
          <div className="text-gray-500">
            <File className="h-6 w-6" />
          </div>
        )
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full h-full max-w-[84rem] bg-white rounded-xl shadow-sm flex flex-col md:flex-row relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar activePage="documents" />

        {/* Main Content */}
        <div className="flex-1 md:ml-6 flex flex-col overflow-hidden">
          {/* Header */}
          <Header title="Documents" />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">All Documents</h2>
                <DocumentUploadDialog />
              </div>

              {isLoading ? (
                <SkeletonLoader type="document" />
              ) : (
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.icon)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type.toUpperCase()}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteDocument(doc.name)
                        }}
                      >
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
                          className="text-gray-500"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs and Toasts */}
      <DeleteDocumentDialog
        documentName={documentToDelete}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteDocument}
      />

      {/* Toasts (positioned absolutely) */}
      <div className="absolute bottom-0 right-0 z-50">
        <Toaster />
      </div>
    </div>
  )
}
