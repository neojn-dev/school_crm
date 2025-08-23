"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Building,
  Clock,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPITileProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
    label: string
  }
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo'
  className?: string
  style?: React.CSSProperties
}

interface KPITilesProps {
  data: {
    totalStaff: number
    activeStaff: number
    inactiveStaff: number
    avgSalary: number
    minSalary: number
    maxSalary: number
  }
  className?: string
}

const colorVariants = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    text: 'text-blue-600',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  green: {
    bg: 'from-green-500 to-green-600',
    text: 'text-green-600',
    lightBg: 'bg-green-50',
    border: 'border-green-200'
  },
  red: {
    bg: 'from-red-500 to-red-600',
    text: 'text-red-600',
    lightBg: 'bg-red-50',
    border: 'border-red-200'
  },
  yellow: {
    bg: 'from-yellow-500 to-yellow-600',
    text: 'text-yellow-600',
    lightBg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  purple: {
    bg: 'from-purple-500 to-purple-600',
    text: 'text-purple-600',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  indigo: {
    bg: 'from-indigo-500 to-indigo-600',
    text: 'text-indigo-600',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-200'
  }
}

function KPITile({ title, value, subtitle, icon: Icon, trend, color, className, style }: KPITileProps) {
  const colors = colorVariants[color]
  
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-200 hover:-translate-y-1", className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 bg-gradient-to-r ${colors.bg} rounded-lg`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
            
            {subtitle && (
              <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
            )}
            
            {trend && (
              <div className="flex items-center space-x-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-sm text-gray-500">{trend.label}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPITiles({ data, className }: KPITilesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const activityRate = data.totalStaff > 0 ? (data.activeStaff / data.totalStaff) * 100 : 0
  const salaryRange = data.maxSalary - data.minSalary

  const kpiData = [
    {
      title: "Total Staff",
      value: data.totalStaff.toLocaleString(),
      subtitle: "All employees across departments",
      icon: Users,
      color: 'blue' as const,
      trend: {
        value: 12,
        isPositive: true,
        label: "vs last month"
      }
    },
    {
      title: "Active Staff",
      value: data.activeStaff.toLocaleString(),
      subtitle: `${activityRate.toFixed(1)}% activity rate`,
      icon: UserCheck,
      color: 'green' as const,
      trend: {
        value: 8,
        isPositive: true,
        label: "vs last month"
      }
    },
    {
      title: "Inactive Staff",
      value: data.inactiveStaff.toLocaleString(),
      subtitle: `${(100 - activityRate).toFixed(1)}% inactive rate`,
      icon: UserX,
      color: 'red' as const,
      trend: {
        value: 3,
        isPositive: false,
        label: "vs last month"
      }
    },
    {
      title: "Average Salary",
      value: formatCurrency(data.avgSalary),
      subtitle: "Across all roles",
      icon: DollarSign,
      color: 'yellow' as const,
      trend: {
        value: 5,
        isPositive: true,
        label: "vs last quarter"
      }
    },
    {
      title: "Salary Range",
      value: formatCurrency(salaryRange),
      subtitle: `${formatCurrency(data.minSalary)} - ${formatCurrency(data.maxSalary)}`,
      icon: Activity,
      color: 'purple' as const
    },
    {
      title: "Performance Score",
      value: "4.2/5.0",
      subtitle: "Overall staff performance",
      icon: Award,
      color: 'indigo' as const,
      trend: {
        value: 2,
        isPositive: true,
        label: "vs last quarter"
      }
    }
  ]

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {kpiData.map((kpi, index) => (
        <KPITile
          key={index}
          title={kpi.title}
          value={kpi.value}
          subtitle={kpi.subtitle}
          icon={kpi.icon}
          color={kpi.color}
          trend={kpi.trend}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
