"use client"

import { useState, useEffect } from "react"
import { Input } from "./input"
import { Label } from "./label"
import { Button } from "./button"
import { Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeRangeInputProps {
  startTime: string
  endTime: string
  onChange: (startTime: string, endTime: string) => void
  minTime?: string
  maxTime?: string
  step?: number
  label?: string
  error?: string
  disabled?: boolean
  className?: string
  showDuration?: boolean
  format24Hour?: boolean
}

export function TimeRangeInput({
  startTime,
  endTime,
  onChange,
  minTime = "00:00",
  maxTime = "23:59",
  step = 900, // 15 minutes in seconds
  label,
  error,
  disabled = false,
  className = "",
  showDuration = true,
  format24Hour = true
}: TimeRangeInputProps) {
  const [localStartTime, setLocalStartTime] = useState(startTime)
  const [localEndTime, setLocalEndTime] = useState(endTime)

  useEffect(() => {
    setLocalStartTime(startTime)
    setLocalEndTime(endTime)
  }, [startTime, endTime])

  // Convert time string to seconds for calculations
  const timeToSeconds = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 3600 + minutes * 60
  }

  // Convert seconds to time string
  const secondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  // Calculate duration between start and end time
  const calculateDuration = (): string => {
    const startSeconds = timeToSeconds(localStartTime)
    const endSeconds = timeToSeconds(localEndTime)
    
    if (endSeconds < startSeconds) {
      // End time is next day
      const duration = (24 * 3600 - startSeconds) + endSeconds
      const hours = Math.floor(duration / 3600)
      const minutes = Math.floor((duration % 3600) / 60)
      return `${hours}h ${minutes}m`
    } else {
      const duration = endSeconds - startSeconds
      const hours = Math.floor(duration / 3600)
      const minutes = Math.floor((duration % 3600) / 60)
      return `${hours}h ${minutes}m`
    }
  }

  // Validate time range
  const validateTimeRange = (start: string, end: string): boolean => {
    const startSeconds = timeToSeconds(start)
    const endSeconds = timeToSeconds(end)
    const minSeconds = timeToSeconds(minTime)
    const maxSeconds = timeToSeconds(maxTime)
    
    return startSeconds >= minSeconds && endSeconds <= maxSeconds
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value
    setLocalStartTime(newStartTime)
    
    if (validateTimeRange(newStartTime, localEndTime)) {
      onChange(newStartTime, localEndTime)
    }
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value
    setLocalEndTime(newEndTime)
    
    if (validateTimeRange(localStartTime, newEndTime)) {
      onChange(localStartTime, newEndTime)
    }
  }

  const handleQuickPreset = (preset: string) => {
    let newStartTime = localStartTime
    let newEndTime = localEndTime
    
    switch (preset) {
      case "morning":
        newStartTime = "09:00"
        newEndTime = "12:00"
        break
      case "afternoon":
        newStartTime = "12:00"
        newEndTime = "17:00"
        break
      case "evening":
        newStartTime = "17:00"
        newEndTime = "21:00"
        break
      case "night":
        newStartTime = "21:00"
        newEndTime = "06:00"
        break
      case "workday":
        newStartTime = "09:00"
        newEndTime = "17:00"
        break
      case "24h":
        newStartTime = "00:00"
        newEndTime = "23:59"
        break
    }
    
    if (validateTimeRange(newStartTime, newEndTime)) {
      setLocalStartTime(newStartTime)
      setLocalEndTime(newEndTime)
      onChange(newStartTime, newEndTime)
    }
  }

  const formatTimeForDisplay = (time: string): string => {
    if (!format24Hour) {
      const [hours, minutes] = time.split(':').map(Number)
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
    }
    return time
  }

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      
      <div className="space-y-3">
        {/* Time Inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">Start Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="time"
                value={localStartTime}
                onChange={handleStartTimeChange}
                min={minTime}
                max={maxTime}
                step={step}
                disabled={disabled}
                className="pl-10"
              />
            </div>
          </div>
          
          <ArrowRight className="h-5 w-5 text-gray-400" />
          
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">End Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="time"
                value={localEndTime}
                onChange={handleEndTimeChange}
                min={minTime}
                max={maxTime}
                step={step}
                disabled={disabled}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {/* Duration Display */}
        {showDuration && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4" />
              Duration: {calculateDuration()}
            </div>
          </div>
        )}
        
        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickPreset("morning")}
            disabled={disabled}
            className="text-xs"
          >
            Morning
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickPreset("afternoon")}
            disabled={disabled}
            className="text-xs"
          >
            Afternoon
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickPreset("evening")}
            disabled={disabled}
            className="text-xs"
          >
            Evening
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickPreset("workday")}
            disabled={disabled}
            className="text-xs"
          >
            Work Day
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickPreset("24h")}
            disabled={disabled}
            className="text-xs"
          >
            24 Hours
          </Button>
        </div>
        
        {/* Time Display */}
        <div className="text-center text-sm text-gray-600">
          <span className="font-medium">{formatTimeForDisplay(localStartTime)}</span>
          <span className="mx-2">to</span>
          <span className="font-medium">{formatTimeForDisplay(localEndTime)}</span>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <div className="text-xs text-gray-500">
        Step: {Math.floor(step / 60)} minutes | Format: {format24Hour ? '24-hour' : '12-hour'}
      </div>
    </div>
  )
}
