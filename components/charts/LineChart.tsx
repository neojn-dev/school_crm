"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LineChartProps {
  title: string
  description?: string
  data: any[]
  dataKeys: { key: string; name: string; color: string; strokeWidth?: number }[]
  xAxisKey: string
  height?: number
  className?: string
  showGrid?: boolean
  showDots?: boolean
}

export function LineChart({ 
  title, 
  description, 
  data, 
  dataKeys, 
  xAxisKey, 
  height = 300,
  className = "",
  showGrid = true,
  showDots = true
}: LineChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
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
              <Line 
                key={dataKey.key}
                type="monotone"
                dataKey={dataKey.key} 
                name={dataKey.name}
                stroke={dataKey.color}
                strokeWidth={dataKey.strokeWidth || 2}
                dot={showDots ? { fill: dataKey.color, strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6, fill: dataKey.color }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
