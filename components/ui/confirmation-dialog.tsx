import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2 } from "lucide-react"

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  type?: "danger" | "warning" | "info"
  itemName?: string
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  type = "danger",
  itemName
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: Trash2,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
        }
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          confirmButton: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
        }
      case "info":
        return {
          icon: AlertTriangle,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        }
      default:
        return {
          icon: Trash2,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
        }
    }
  }

  const styles = getTypeStyles()
  const Icon = styles.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${styles.bgColor} ${styles.borderColor} border`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 pt-2">
            {description}
            {itemName && (
              <span className="font-medium text-gray-900 block mt-1">
                "{itemName}"
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`${styles.confirmButton} px-6 text-white`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
