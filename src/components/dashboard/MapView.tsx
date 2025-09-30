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
import { mockFishingZones } from '@/lib/mockData';
import InteractiveMap from '@/components/map/InteractiveMap';
import { useState } from 'react';


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
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

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
        <div className="mb-4">
          <InteractiveMap 
            zones={mockFishingZones}
            onZoneClick={setSelectedZone}
            selectedZoneId={selectedZone}
            height="320px"
          />
        </div>

        {/* Zone Details */}
        <div className="space-y-3">
          {mockFishingZones.map((zone) => {
            const styles = statusStyles[zone.status];
            const isSelected = selectedZone === zone.id;
            return (
              <div 
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={cn(
                  'p-3 rounded-lg border transition-all duration-200 hover:shadow-surface cursor-pointer',
                  styles.bg,
                  styles.border,
                  isSelected && 'ring-2 ring-primary'
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
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {zone.coordinates.lat.toFixed(4)}°N, {zone.coordinates.lng.toFixed(4)}°E
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      {zone.status !== 'restricted' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Fish className="h-3 w-3" />
                            <span>{zone.avgCatchRate} kg/trip avg</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Anchor className="h-3 w-3" />
                            <span>{zone.primarySpecies.slice(0, 2).join(', ')}</span>
                          </div>
                        </>
                      )}
                      
                      {zone.status === 'restricted' && (
                        <div className="flex items-center space-x-1 text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          <span>Fishing prohibited</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{zone.lastSurvey}</div>
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