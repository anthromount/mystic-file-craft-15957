import Header from '@/components/layout/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import WeatherAlert from '@/components/dashboard/WeatherAlert';
import MapView from '@/components/dashboard/MapView';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { dashboardWeatherData } from '@/lib/mockData';
import { 
  Fish, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Waves,
  MapPin 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-ocean flex items-center justify-center">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Fisheries Decision Support System
              </h1>
              <p className="text-muted-foreground">
                Sustainable fishing guidance for Virac, Catanduanes
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Fishers"
            value="1,247"
            subtitle="Registered in system"
            icon={Users}
            trend={{ value: 8, label: 'this month', positive: true }}
            variant="default"
          />
          
          <MetricCard
            title="Daily Catch Average"
            value="6.8 kg"
            subtitle="Per fishing trip"
            icon={Fish}
            trend={{ value: -12, label: 'vs last month', positive: false }}
            variant="coral"
          />
          
          <MetricCard
            title="Sustainability Index"
            value="72%"
            subtitle="Compliance rate"
            icon={TrendingUp}
            trend={{ value: 5, label: 'improvement', positive: true }}
            variant="success"
          />
          
          <MetricCard
            title="Weather Alerts"
            value="3"
            subtitle="Active advisories"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Weather & Conditions */}
        <div className="mb-8">
          <WeatherAlert weather={dashboardWeatherData} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GIS Map View */}
          <MapView />
          
          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Research Tools Section */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-surface border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Research Tools</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Access advanced analytics, data collection tools, and research features for 
            the Decision Support System framework study.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-smooth"
              onClick={() => window.location.href = '/data-collection'}
            >
              Data Collection
            </button>
            <button 
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-smooth"
              onClick={() => window.location.href = '/gis-mapping'}
            >
              GIS Analytics
            </button>
            <button 
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-smooth"
              onClick={() => window.location.href = '/analytics'}
            >
              Survey Tools
            </button>
            <button 
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-smooth"
              onClick={() => window.location.href = '/user-management'}
            >
              User Management
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
