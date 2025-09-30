import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  Fish,
  Users,
  MapPin,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import { getAnalytics, getSpeciesData, getMonthlyCatchTrends, mockFishers, mockCatchRecords } from '@/lib/mockData';

const Analytics = () => {
  const analytics = getAnalytics();
  const speciesData = getSpeciesData();
  const monthlyTrends = getMonthlyCatchTrends();

  const pieColors = ['#2563eb', '#16a34a', '#dc2626', '#ea580c', '#7c3aed', '#0891b2'];

  // Fisher performance data
  const fisherPerformance = mockFishers.map(fisher => ({
    name: fisher.name.split(' ')[0], // First name only for chart
    catches: fisher.totalCatches,
    avgCatch: fisher.avgCatchPerTrip,
    efficiency: Math.round((fisher.avgCatchPerTrip / 10) * 100)
  }));

  // Catch by location data
  const locationData = [
    { location: 'Balite Bay', catches: 145, percentage: 45 },
    { location: 'San Miguel', catches: 98, percentage: 30 },
    { location: 'Carangay', catches: 82, percentage: 25 }
  ];

  // Weekly catch trends
  const weeklyData = [
    { week: 'Week 1', catches: 285, revenue: 65000, trips: 42 },
    { week: 'Week 2', catches: 312, revenue: 71000, trips: 45 },
    { week: 'Week 3', catches: 298, revenue: 68000, trips: 41 },
    { week: 'Week 4', catches: 325, revenue: 74000, trips: 48 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-primary/10 to-primary-light/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fishers</p>
                <p className="text-2xl font-bold text-primary">{analytics.totalFishers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Catches</p>
                <p className="text-2xl font-bold text-success">{analytics.totalCatches} kg</p>
              </div>
              <Fish className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent-coral/20 to-accent-coral/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Per Trip</p>
                <p className="text-2xl font-bold text-accent-coral">{analytics.avgCatchPerTrip} kg</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent-coral" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-warning-foreground">₱{analytics.totalRevenue.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-muted/20 to-muted/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sustainability</p>
                <p className="text-2xl font-bold text-foreground">{analytics.sustainabilityIndex}%</p>
              </div>
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-1 md:grid-cols-4 gap-2 h-auto">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="species" className="flex items-center space-x-2">
            <Fish className="h-4 w-4" />
            <span>Species Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Sustainability</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Catch Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Catch Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrends}>
                    <defs>
                      <linearGradient id="catchGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'catches' ? `${value} kg` : `₱${value.toLocaleString()}`,
                        name === 'catches' ? 'Total Catches' : 'Revenue'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="catches" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1}
                      fill="url(#catchGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="catches" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Location Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Catch by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {locationData.map((location, index) => (
                  <div key={location.location} className="text-center p-4 bg-muted/20 rounded-lg">
                    <h3 className="font-semibold text-lg text-foreground">{location.location}</h3>
                    <div className="text-3xl font-bold text-primary my-2">{location.catches} kg</div>
                    <div className="text-sm text-muted-foreground">{location.percentage}% of total</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-3">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Species Analysis Tab */}
        <TabsContent value="species" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Species Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Species Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={speciesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ species, percentage }) => `${species} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {speciesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Species Details */}
            <Card>
              <CardHeader>
                <CardTitle>Species Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {speciesData.map((species, index) => (
                  <div key={species.species} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                      ></div>
                      <span className="font-medium text-foreground">{species.species}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{species.count} records</div>
                      <div className="text-sm text-muted-foreground">{species.percentage}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fisher Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Fisher Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fisherPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="catches" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Efficiency Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fisherPerformance.map((fisher, index) => (
                  <div key={fisher.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{fisher.name}</span>
                      <Badge variant={fisher.efficiency > 80 ? 'default' : fisher.efficiency > 60 ? 'secondary' : 'outline'}>
                        {fisher.efficiency}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          fisher.efficiency > 80 ? 'bg-success' : 
                          fisher.efficiency > 60 ? 'bg-primary' : 'bg-warning'
                        }`}
                        style={{ width: `${fisher.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sustainability Tab */}
        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-success/10 to-success/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">72%</div>
                <div className="text-sm text-muted-foreground">Overall Sustainability Index</div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div className="bg-success h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">89%</div>
                <div className="text-sm text-muted-foreground">Regulatory Compliance</div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-warning-foreground mb-2">65%</div>
                <div className="text-sm text-muted-foreground">Ecosystem Health</div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-semibold text-success mb-2">Positive Trends</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Increased compliance with fishing quotas</li>
                  <li>• Better gear selectivity reducing juvenile catches</li>
                  <li>• Growing participation in marine protected areas</li>
                </ul>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-semibold text-warning-foreground mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reduce fishing pressure in Balite Bay during spawning season</li>
                  <li>• Implement seasonal closures for vulnerable species</li>
                  <li>• Enhance monitoring of restricted zones</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Recommended Actions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Establish community-based management programs</li>
                  <li>• Provide alternative livelihood training during closed seasons</li>
                  <li>• Strengthen enforcement of fishing regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;