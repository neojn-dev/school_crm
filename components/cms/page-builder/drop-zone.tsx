"use client"

import { useState } from "react"
import { Target, Plus } from "lucide-react"

interface DropZoneProps {
  id: string
  index: number
  isActive: boolean
  onDrop?: (item: any) => void
  className?: string
  showAlways?: boolean
}

export function DropZone({ 
  id, 
  index, 
  isActive, 
  onDrop, 
  className = "",
  showAlways = false 
}: DropZoneProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (!isActive && !showAlways) {
    return <div className="h-2" />
  }

  return (
    <div
      className={`
        relative transition-all duration-200 ease-in-out
        ${isActive ? 'h-12 opacity-100' : 'h-2 opacity-0'}
        ${isHovered ? 'h-16' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isActive || showAlways) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            w-full border-2 border-dashed rounded-lg transition-all duration-200
            ${isHovered 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'border-gray-300 bg-gray-50'
            }
            ${isActive ? 'animate-pulse' : ''}
          `}>
            <div className="flex items-center justify-center py-2">
              <div className={`
                flex items-center space-x-2 text-sm font-medium transition-colors
                ${isHovered ? 'text-blue-600' : 'text-gray-500'}
              `}>
                {isHovered ? (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Drop block here</span>
                  </>
                ) : (
                  <>
                    <Target className="h-3 w-3" />
                    <span className="text-xs">Drop zone</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
