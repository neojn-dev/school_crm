"use client"

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AreaChartProps {
  title: string
  description?: string
  data: any[]
  dataKeys: { key: string; name: string; color: string; fillOpacity?: number }[]
  xAxisKey: string
  height?: number
  className?: string
  stacked?: boolean
}

export function AreaChart({ 
  title, 
  description, 
  data, 
  dataKeys, 
  xAxisKey, 
  height = 300,
  className = "",
  stacked = false
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsAreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {dataKeys.map((dataKey, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${dataKey.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={dataKey.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={dataKey.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            {dataKeys.map((dataKey) => (
              <Area 
                key={dataKey.key}
                type="monotone"
                dataKey={dataKey.key} 
                name={dataKey.name}
                stackId={stacked ? "1" : dataKey.key}
                stroke={dataKey.color}
                strokeWidth={2}
                fill={`url(#gradient-${dataKey.key})`}
                fillOpacity={dataKey.fillOpacity || 0.6}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
