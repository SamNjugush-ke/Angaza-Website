import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { TrendingUp, Users, DollarSign, Eye, Share2, Download } from "lucide-react";

const COLORS = ["#F59E0B", "#06B6D4", "#8B5CF6", "#EC4899", "#14B8A6"];

export default function AnalyticsDashboard() {
  const [days, setDays] = useState("30");

  // Analytics queries
  const pageViewStats = trpc.admin.analytics.getPageViewStats.useQuery({ days: parseInt(days) });
  const topPages = trpc.admin.analytics.getTopPages.useQuery({ limit: 10, days: parseInt(days) });
  const visitorTrend = trpc.admin.analytics.getVisitorTrend.useQuery({ days: parseInt(days) });
  const contentPerformance = trpc.admin.analytics.getContentPerformance.useQuery({ days: parseInt(days) });
  const analyticsSummary = trpc.admin.analytics.getAnalyticsSummary.useQuery({ days: parseInt(days) });
  const donationStats = trpc.admin.analytics.getDonationStats.useQuery({ days: parseInt(days) });
  const donationTrend = trpc.admin.analytics.getDonationTrend.useQuery({ days: parseInt(days) });
  const donationByMethod = trpc.admin.analytics.getDonationByMethod.useQuery({ days: parseInt(days) });

  const isLoading = pageViewStats.isLoading || topPages.isLoading || visitorTrend.isLoading;

  return (
    <div className="space-y-6">
      {/* Header with date range selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Track visitor engagement and platform performance</p>
        </div>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : analyticsSummary.data?.totalPageViews?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-gray-600">Total views across all pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : analyticsSummary.data?.totalUniqueVisitors?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-gray-600">Distinct visitor sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : `KES ${analyticsSummary.data?.totalDonations?.toLocaleString() || "0"}`}
            </div>
            <p className="text-xs text-gray-600">{analyticsSummary.data?.totalDonationCount || 0} donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : `${analyticsSummary.data?.avgBounceRate || 0}%`}
            </div>
            <p className="text-xs text-gray-600">Lower is better</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Trend</CardTitle>
            <CardDescription>Daily page views and unique visitors</CardDescription>
          </CardHeader>
          <CardContent>
            {visitorTrend.isLoading ? (
              <div className="h-80 flex items-center justify-center text-gray-400">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorTrend.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#F59E0B" name="Page Views" />
                  <Line type="monotone" dataKey="uniqueVisitors" stroke="#06B6D4" name="Unique Visitors" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Donation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Trend</CardTitle>
            <CardDescription>Daily donations and average amount</CardDescription>
          </CardHeader>
          <CardContent>
            {donationTrend.isLoading ? (
              <div className="h-80 flex items-center justify-center text-gray-400">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donationTrend.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalAmount" fill="#10B981" name="Total Amount (KES)" />
                  <Bar dataKey="count" fill="#F59E0B" name="Donation Count" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            {topPages.isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topPages.data?.slice(0, 5).map((page: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between pb-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{page.pageTitle}</p>
                      <p className="text-xs text-gray-600">{page.pagePath}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{page.viewCount?.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{page.uniqueVisitors} visitors</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Donation by Method */}
        <Card>
          <CardHeader>
            <CardTitle>Donations by Method</CardTitle>
            <CardDescription>Payment method breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {donationByMethod.isLoading ? (
              <div className="h-80 flex items-center justify-center text-gray-400">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={donationByMethod.data || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ method, count }) => `${method}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {(donationByMethod.data || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>Engagement metrics by content type</CardDescription>
        </CardHeader>
        <CardContent>
          {contentPerformance.isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Content Type</th>
                    <th className="text-right py-2 px-2">Views</th>
                    <th className="text-right py-2 px-2">Shares</th>
                    <th className="text-right py-2 px-2">Downloads</th>
                    <th className="text-right py-2 px-2">Avg Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {contentPerformance.data?.map((content: any, idx: number) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 capitalize">{content.contentType}</td>
                      <td className="text-right py-2 px-2">{content.totalViews?.toLocaleString() || 0}</td>
                      <td className="text-right py-2 px-2">{content.totalShares?.toLocaleString() || 0}</td>
                      <td className="text-right py-2 px-2">{content.totalDownloads?.toLocaleString() || 0}</td>
                      <td className="text-right py-2 px-2">{content.avgEngagement?.toLocaleString() || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Donation Statistics</CardTitle>
          <CardDescription>Summary of donation activity</CardDescription>
        </CardHeader>
        <CardContent>
          {donationStats.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-green-600">
                  KES {donationStats.data?.totalAmount?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Donation Count</p>
                <p className="text-2xl font-bold text-blue-600">
                  {donationStats.data?.totalCount?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Average Donation</p>
                <p className="text-2xl font-bold text-purple-600">
                  KES {donationStats.data?.avgAmount?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Max Donation</p>
                <p className="text-2xl font-bold text-orange-600">
                  KES {donationStats.data?.maxAmount?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
