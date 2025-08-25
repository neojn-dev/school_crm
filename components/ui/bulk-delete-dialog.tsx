"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "react-toastify"

interface BulkDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (password: string) => Promise<void>
  selectedCount: number
  entityName: string
  isDeleteAll?: boolean
}

export function BulkDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  selectedCount,
  entityName,
  isDeleteAll = false
}: BulkDeleteDialogProps) {
  const { data: session } = useSession()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (isDeleteAll && !password.trim()) {
      toast.error("Password is required for delete all operation")
      return
    }

    if (isDeleteAll && session?.user?.role !== 'Admin') {
      toast.error("Only administrators can perform delete all operations")
      return
    }

    try {
      setIsDeleting(true)
      await onConfirm(password)
      setPassword("")
      onOpenChange(false)
    } catch (error) {
      console.error("Bulk delete error:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setPassword("")
    onOpenChange(false)
  }

  const actionText = isDeleteAll ? "Delete All" : "Delete Selected"
  const warningText = isDeleteAll 
    ? `This will permanently delete ALL ${entityName.toLowerCase()} records from the database. This action cannot be undone.`
    : `This will permanently delete ${selectedCount} selected ${entityName.toLowerCase()} record${selectedCount > 1 ? 's' : ''}.`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            {actionText} {entityName}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {warningText}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-800 font-semibold text-sm">
                  {isDeleteAll ? "CRITICAL ACTION" : "WARNING"}
                </h4>
                <p className="text-red-700 text-sm mt-1">
                  {isDeleteAll 
                    ? "You are about to delete ALL records. This action is irreversible and will affect the entire system."
                    : "This action cannot be undone. The selected records will be permanently removed."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Password Input for Delete All */}
          {isDeleteAll && (
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-sm font-medium">
                Admin Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="pr-10"
                  disabled={isDeleting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isDeleting}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Password verification is required for delete all operations
              </p>
            </div>
          )}

          {/* Confirmation Text */}
          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <strong>Records to be deleted:</strong> {isDeleteAll ? `All ${entityName.toLowerCase()}` : `${selectedCount} selected`}
            </p>
            {session?.user?.username && (
              <p className="text-xs text-gray-500 mt-1">
                Action will be performed by: <strong>{session.user.username}</strong>
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting || (isDeleteAll && !password.trim())}
            className="min-w-[120px]"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                {actionText}
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
