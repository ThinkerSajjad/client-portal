"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Send, Paperclip } from "lucide-react"
import { Toaster } from "@/components/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Sidebar } from "@/components/sidebar"
import { ChatFileUpload } from "@/components/chat-file-upload"
import { Header } from "@/components/header"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Support Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Hi there! How can I help you today?",
      time: "3 minutes ago",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Hello! I have a question about the new website design.",
      time: "3 minute ago",
      isUser: true,
    },
    {
      id: 3,
      sender: "Support Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Sure, feel free to ask.",
      time: "2 minutes ago",
      isUser: false,
    },
    {
      id: 4,
      sender: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I'd like to make some changes to the homepage",
      time: "now",
      isUser: true,
    },
    {
      id: 5,
      sender: "Support Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Of course! I'll get started on that",
      time: "just now",
      isUser: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [chatAttachments, setChatAttachments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() && chatAttachments.length === 0) return

    setIsLoading(true)

    // Simulate sending delay
    setTimeout(() => {
      const newId = messages.length + 1

      setMessages([
        ...messages,
        {
          id: newId,
          sender: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          content: newMessage,
          time: "just now",
          isUser: true,
          attachments: chatAttachments.length > 0 ? chatAttachments : undefined,
        },
      ])

      setNewMessage("")
      setChatAttachments([])
      setIsLoading(false)

      // Simulate agent response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: newId + 1,
            sender: "Support Agent",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "Thanks for your message. I'll look into this and get back to you shortly.",
            time: "just now",
            isUser: false,
          },
        ])
      }, 2000)
    }, 1000)
  }

  const handleChatFileUploaded = (fileUrl: string, fileName: string) => {
    setChatAttachments([...chatAttachments, fileName])
    toast({
      title: "File attached",
      description: `${fileName} has been attached to your message.`,
      variant: "success",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto bg-white shadow-sm max-w-7xl h-screen flex flex-col">
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar activePage="chat" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header title="Chat" />

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-bold text-sm ${message.isUser ? "text-right" : ""}`}>
                            {message.isUser ? "You" : message.sender}
                          </p>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isUser ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                              {message.attachments.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Paperclip className="h-3 w-3" />
                                  <span>{file}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              {chatAttachments.length > 0 && (
                <div className="mb-2 p-2 bg-gray-50 rounded-md">
                  {chatAttachments.map((fileName, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Paperclip className="h-4 w-4 mr-2" />
                      {fileName}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <ChatFileUpload onFileUploaded={handleChatFileUploaded} />
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
