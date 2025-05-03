"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface TicketLimitWarningProps {
  isOpen: boolean
  onClose: () => void
  remainingTickets: number
}

export function TicketLimitWarning({ isOpen, onClose, remainingTickets }: TicketLimitWarningProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-600">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Ticket Usage Limit Warning
          </DialogTitle>
          <DialogDescription>
            You are running low on available tickets. You have {remainingTickets} ticket
            {remainingTickets === 1 ? "" : "s"} remaining in your current plan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Consider upgrading your plan to ensure uninterrupted service. Once you reach your limit, you won't be able
            to create new tickets until you upgrade or your plan renews.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Continue
          </Button>
          <Button>Upgrade Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
