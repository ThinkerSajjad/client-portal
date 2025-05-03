"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { useToast } from "@/components/ui/use-toast"
import { Paperclip } from "lucide-react"

interface TicketFileUploadProps {
  onFileUploaded?: (fileUrl: string, fileName: string) => void
}

export function TicketFileUpload({ onFileUploaded }: TicketFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileSelect = async (file: File) => {
    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful upload with a fake URL
    const mockFileUrl = `/uploads/${file.name}`

    if (onFileUploaded) {
      onFileUploaded(mockFileUrl, file.name)
    }

    setIsUploading(false)

    toast({
      title: "File attached",
      description: `${file.name} has been attached to your ticket.`,
      variant: "success",
    })
  }

  return (
    <FileUpload
      onFileSelect={handleFileSelect}
      buttonText="Attach File"
      icon={<Paperclip className="h-4 w-4 mr-2" />}
      variant="outline"
      isLoading={isUploading}
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    />
  )
}
