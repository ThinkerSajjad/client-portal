"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Toaster } from "@/components/toaster"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

export default function TicketsPage() {
  const [tickets, setTickets] = useState([
    {
      id: "ticket-1",
      title: "Landing page development",
      status: "In Progress",
      date: "Apr 16",
      priority: "High",
      description: "We need a new landing page designed and developed to promote our latest product.",
    },
    {
      id: "ticket-2",
      title: "Mobile app bug fixes",
      status: "Open",
      date: "Apr 15",
      priority: "Medium",
      description: "Several bugs have been reported in the latest mobile app release.",
    },
    {
      id: "ticket-3",
      title: "Update product pricing",
      status: "Completed",
      date: "Apr 14",
      priority: "Low",
      description: "Update the pricing information on all product pages.",
    },
    {
      id: "ticket-4",
      title: "Newsletter integration",
      status: "In Progress",
      date: "Apr 13",
      priority: "Medium",
      description: "Integrate the newsletter signup form with our email marketing platform.",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            In Progress
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
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
            <Header title="Tickets" />

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">All Tickets</h2>
                <Link href="/dashboard">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Ticket
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Link href={`/ticket/${ticket.id}`} key={ticket.id}>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(ticket.status)}
                          <div>
                            <h3 className="font-medium text-lg">{ticket.title}</h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{ticket.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(ticket.status)}
                          <span className="text-xs text-gray-500">Submitted {ticket.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
