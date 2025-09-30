import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Fish, 
  Anchor, 
  AlertCircle, 
  TrendingUp,
  Maximize2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FishingZone {
  id: string;
  name: string;
  coordinates: string;
  status: 'optimal' | 'good' | 'poor' | 'restricted';
  catchRate: number;
  fishTypes: string[];
  lastUpdated: string;
}

const mockFishingZones: FishingZone[] = [
  {
    id: '1',
    name: 'Balite Bay',
    coordinates: '13.5827°N, 124.2337°E',
    status: 'optimal',
    catchRate: 8.5,
    fishTypes: ['Tuna', 'Mackerel', 'Sardines'],
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'San Miguel Coast',
    coordinates: '13.5691°N, 124.2458°E',
    status: 'good',
    catchRate: 6.2,
    fishTypes: ['Grouper', 'Snapper'],
    lastUpdated: '4 hours ago'
  },
  {
    id: '3',
    name: 'Carangay Waters',
    coordinates: '13.5934°N, 124.2201°E',
    status: 'restricted',
    catchRate: 0,
    fishTypes: [],
    lastUpdated: '1 day ago'
  }
];

const statusStyles = {
  optimal: {
    bg: 'bg-success/10',
    text: 'text-success',
    border: 'border-success/30',
    dot: 'bg-success'
  },
  good: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/30',
    dot: 'bg-primary'
  },
  poor: {
    bg: 'bg-warning/10',
    text: 'text-warning-foreground',
    border: 'border-warning/30',
    dot: 'bg-warning'
  },
  restricted: {
    bg: 'bg-destructive/10',
    text: 'text-destructive',
    border: 'border-destructive/30',
    dot: 'bg-destructive'
  }
};

export default function MapView() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Fishing Zones - Virac Waters</span>
        </CardTitle>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <Maximize2 className="h-3 w-3" />
          <span>Full Map</span>
        </Button>
      </CardHeader>
      <CardContent>
        {/* Interactive Map Placeholder */}
        <div className="relative h-64 md:h-80 rounded-lg bg-gradient-to-br from-primary/5 via-primary-light/10 to-accent/5 border border-border mb-4 overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-primary/20 rounded-lg"></div>
          </div>
          
          {/* Mock Map Points */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs font-medium shadow-surface">
                Balite Bay
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs font-medium shadow-surface">
                San Miguel
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <div className="h-3 w-3 bg-destructive rounded-full animate-pulse"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs font-medium shadow-surface">
                Restricted
              </div>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 border shadow-surface">
            <div className="text-xs font-medium text-foreground mb-2">Zone Status</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span className="text-xs text-muted-foreground">Optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-destructive rounded-full"></div>
                <span className="text-xs text-muted-foreground">Restricted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Details */}
        <div className="space-y-3">
          {mockFishingZones.map((zone) => {
            const styles = statusStyles[zone.status];
            return (
              <div 
                key={zone.id}
                className={cn(
                  'p-3 rounded-lg border transition-all duration-200 hover:shadow-surface',
                  styles.bg,
                  styles.border
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={cn('h-2 w-2 rounded-full', styles.dot)}></div>
                      <h4 className="font-medium text-foreground">{zone.name}</h4>
                      <Badge variant="outline" className={cn('text-xs', styles.text)}>
                        {zone.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{zone.coordinates}</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      {zone.status !== 'restricted' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Fish className="h-3 w-3" />
                            <span>{zone.catchRate} kg/trip avg</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Anchor className="h-3 w-3" />
                            <span>{zone.fishTypes.join(', ')}</span>
                          </div>
                        </>
                      )}
                      
                      {zone.status === 'restricted' && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>Fishing prohibited</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{zone.lastUpdated}</div>
                    {zone.status === 'optimal' && (
                      <div className="flex items-center text-xs text-success mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        High activity
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}