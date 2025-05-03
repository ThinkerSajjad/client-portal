"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"
import { useToast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

export function DocumentUploadDialog() {
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleFileSelect = async (file: File) => {
    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsUploading(false)
    setOpen(false)

    toast({
      title: "Document uploaded",
      description: `${file.name} has been successfully uploaded.`,
      variant: "success",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Upload a document to share with your team. Supported file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG.
            </p>
            <FileUpload
              onFileSelect={handleFileSelect}
              buttonText="Select Document"
              isLoading={isUploading}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
