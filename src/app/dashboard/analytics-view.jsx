"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

// --- Dummy Data ---
const revenueData = [
  { month: "Jan", revenue: 4000, visitors: 2400 },
  { month: "Feb", revenue: 3000, visitors: 1398 },
  { month: "Mar", revenue: 2000, visitors: 9800 },
  { month: "Apr", revenue: 2780, visitors: 3908 },
  { month: "May", revenue: 1890, visitors: 4800 },
  { month: "Jun", revenue: 2390, visitors: 3800 },
  { month: "Jul", revenue: 3490, visitors: 4300 },
]

const categoryData = [
  { name: "Electronics", sales: 4000 },
  { name: "Apparel", sales: 3000 },
  { name: "Home", sales: 2000 },
  { name: "Beauty", sales: 2780 },
  { name: "Sports", sales: 1890 },
]

const distributionData = [
  { name: "Desktop", value: 400, color: "var(--color-desktop)" },
  { name: "Mobile", value: 300, color: "var(--color-mobile)" },
  { name: "Tablet", value: 300, color: "var(--color-tablet)" },
]

// --- Chart Configurations ---
const lineChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
}

const barChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-3)",
  },
}

const pieChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-4)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-5)",
  },
}

export function AnalyticsView() {
  const [timeRange, setTimeRange] = React.useState("7d")

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto no-scrollbar max-w-[1600px] mx-auto w-full">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Review your performance metrics and growth.</p>
        </div>
        <div className="w-full sm:w-[180px]">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground mt-1">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Visitors Trend</CardTitle>
            <CardDescription>Daily performance for the selected period.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig} className="min-h-[300px] w-full">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  tickFormatter={(val) => `${val}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Users segmented by platform.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center pb-0">
            <ChartContainer config={pieChartConfig} className="min-h-[250px] aspect-square w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent verticalAlign="bottom" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Sales figures across different product categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig} className="min-h-[300px] w-full">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="sales" 
                  fill="var(--color-sales)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
