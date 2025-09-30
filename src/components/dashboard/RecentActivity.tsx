import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Fish, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  User,
  MoreHorizontal 
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'catch_report' | 'weather_alert' | 'zone_update' | 'fisher_registration';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  value?: number;
  trend?: 'up' | 'down' | 'stable';
  priority?: 'low' | 'medium' | 'high';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'catch_report',
    title: 'High Catch Report - Balite Bay',
    description: 'Tuna catch reported at 12.5 kg per trip',
    timestamp: '2 hours ago',
    user: 'Jose Santos',
    value: 12.5,
    trend: 'up'
  },
  {
    id: '2',
    type: 'weather_alert',
    title: 'Weather Advisory Issued',
    description: 'Moderate winds expected in eastern waters',
    timestamp: '4 hours ago',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'zone_update',
    title: 'Fishing Zone Status Updated',
    description: 'San Miguel Coast marked as good conditions',
    timestamp: '6 hours ago',
    trend: 'up'
  },
  {
    id: '4',
    type: 'fisher_registration',
    title: 'New Fisher Registration',
    description: 'Maria Cruz registered in Carangay Barangay',
    timestamp: '1 day ago',
    user: 'Maria Cruz'
  },
  {
    id: '5',
    type: 'catch_report',
    title: 'Declining Catch - Carangay Waters',
    description: 'Average catch down to 3.2 kg per trip',
    timestamp: '1 day ago',
    value: 3.2,
    trend: 'down'
  }
];

const activityIcons = {
  catch_report: Fish,
  weather_alert: Clock,
  zone_update: TrendingUp,
  fisher_registration: User,
};

const priorityStyles = {
  low: 'border-l-muted',
  medium: 'border-l-warning',
  high: 'border-l-destructive',
};

export default function RecentActivity() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = activityIcons[activity.type];
          
          return (
            <div
              key={activity.id}
              className={`p-3 rounded-lg border-l-4 bg-card transition-all duration-200 hover:shadow-surface hover:bg-accent/5 ${
                activity.priority ? priorityStyles[activity.priority] : 'border-l-primary/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    
                    {activity.trend && (
                      <div className="flex-shrink-0 ml-2">
                        {activity.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : activity.trend === 'down' ? (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        ) : null}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {activity.user && (
                        <Badge variant="outline" className="text-xs">
                          {activity.user}
                        </Badge>
                      )}
                      
                      {activity.value && (
                        <span className={`text-xs font-medium ${
                          activity.trend === 'up' ? 'text-success' : 
                          activity.trend === 'down' ? 'text-destructive' : 'text-foreground'
                        }`}>
                          {activity.value} kg
                        </span>
                      )}
                    </div>
                    
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* View All Button */}
        <Button variant="outline" size="sm" className="w-full mt-4">
          View All Activities
        </Button>
      </CardContent>
    </Card>
  );
}