"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, X, FileText, ImageIcon, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  className?: string
  buttonText?: string
  icon?: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  accept?: string
  isLoading?: boolean
  multiple?: boolean
}

export function FileUpload({
  onFileSelect,
  className,
  buttonText = "Attach File",
  icon = <Paperclip className="h-4 w-4 mr-2" />,
  variant = "outline",
  accept,
  isLoading = false,
  multiple = false,
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => (multiple ? [...prev, ...filesArray] : filesArray))

      if (onFileSelect && filesArray.length > 0) {
        if (multiple) {
          filesArray.forEach((file) => onFileSelect(file))
        } else {
          onFileSelect(filesArray[0])
        }
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    } else if (fileType.includes("pdf") || fileType.includes("document")) {
      return <FileText className="h-4 w-4" />
    } else {
      return <File className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={isLoading}
      />

      <Button
        type="button"
        onClick={handleButtonClick}
        variant={variant}
        disabled={isLoading}
        className={cn(isLoading && "opacity-70 cursor-not-allowed")}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </div>
        ) : (
          <>
            {icon}
            {buttonText}
          </>
        )}
      </Button>

      {selectedFiles.length > 0 && (
        <div className="space-y-2 mt-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <div className="flex items-center">
                {getFileIcon(file)}
                <span className="ml-2 text-sm truncate max-w-[200px]">{file.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
