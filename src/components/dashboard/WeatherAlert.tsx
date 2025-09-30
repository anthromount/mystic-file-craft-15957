import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Waves,
  ExternalLink 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  temperature: number;
  windSpeed: number;
  waveHeight: number;
  visibility: number;
  alert?: {
    level: 'low' | 'moderate' | 'high' | 'critical';
    message: string;
  };
}

interface WeatherAlertProps {
  weather: WeatherData;
  location?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: AlertTriangle,
};

const alertStyles = {
  low: 'border-success/50 bg-success/5',
  moderate: 'border-warning/50 bg-warning/5',
  high: 'border-warning bg-warning/10',
  critical: 'border-destructive bg-destructive/10',
};

const alertTextStyles = {
  low: 'text-success',
  moderate: 'text-warning-foreground',
  high: 'text-warning-foreground',
  critical: 'text-destructive',
};

export default function WeatherAlert({ weather, location = "Virac, Catanduanes" }: WeatherAlertProps) {
  const WeatherIcon = weatherIcons[weather.condition];
  
  const getFishingRecommendation = () => {
    if (weather.alert?.level === 'critical' || weather.waveHeight > 3) {
      return { status: 'Not Recommended', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    }
    if (weather.alert?.level === 'high' || weather.windSpeed > 25) {
      return { status: 'Caution Advised', color: 'text-warning-foreground', bgColor: 'bg-warning/10' };
    }
    if (weather.windSpeed < 15 && weather.waveHeight < 1.5) {
      return { status: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    }
    return { status: 'Good', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const recommendation = getFishingRecommendation();

  return (
    <div className="space-y-4">
      {/* Weather Alert */}
      {weather.alert && (
        <Alert className={cn(alertStyles[weather.alert.level])}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className={cn('font-semibold', alertTextStyles[weather.alert.level])}>
            Weather Alert - {weather.alert.level.toUpperCase()}
          </AlertTitle>
          <AlertDescription className="mt-2">
            {weather.alert.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Current Weather Card */}
      <div className="rounded-lg border bg-card p-6 shadow-surface">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Weather</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <WeatherIcon className="h-8 w-8 text-primary" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{weather.temperature}°C</div>
            <div className="text-sm text-muted-foreground">Temperature</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-xl font-bold text-foreground">
              <Wind className="h-4 w-4 mr-1" />
              {weather.windSpeed}
            </div>
            <div className="text-sm text-muted-foreground">Wind (km/h)</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-xl font-bold text-foreground">
              <Waves className="h-4 w-4 mr-1" />
              {weather.waveHeight}m
            </div>
            <div className="text-sm text-muted-foreground">Wave Height</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">{weather.visibility}km</div>
            <div className="text-sm text-muted-foreground">Visibility</div>
          </div>
        </div>

        {/* Fishing Recommendation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Fishing Conditions:</span>
            <Badge className={cn('font-medium', recommendation.color, recommendation.bgColor)}>
              {recommendation.status}
            </Badge>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <span>View Forecast</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}