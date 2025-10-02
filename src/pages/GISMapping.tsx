import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Fish, 
  TrendingUp, 
  AlertTriangle, 
  Layers,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { mockFishingZones, mockCatchRecords, mockWeatherData } from '@/lib/mockData';
import InteractiveMap from '@/components/map/InteractiveMap';

const GISMapping = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<'zones' | 'catches' | 'weather'>('zones');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'poor': return 'bg-warning text-warning-foreground';
      case 'restricted': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const selectedZoneData = selectedZone 
    ? mockFishingZones.find(zone => zone.id === selectedZone)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GIS Mapping System</h1>
          <p className="text-muted-foreground">Interactive mapping and spatial analysis for fishing zones</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5" />
              <span>Map Layers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={mapLayer} onValueChange={(value) => setMapLayer(value as any)}>
              <TabsList className="grid w-full grid-cols-1 gap-2 h-auto">
                <TabsTrigger value="zones" className="justify-start">
                  <Fish className="h-4 w-4 mr-2" />
                  Fishing Zones
                </TabsTrigger>
                <TabsTrigger value="catches" className="justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Catch Points
                </TabsTrigger>
                <TabsTrigger value="weather" className="justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Weather Data
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Layer Content */}
            <div className="space-y-2">
              {mapLayer === 'zones' && (
                <>
                  <h4 className="font-medium text-sm text-muted-foreground">FISHING ZONES</h4>
                  {mockFishingZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-surface ${
                        selectedZone === zone.id ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm text-foreground">{zone.name}</h5>
                        <Badge className={getStatusColor(zone.status)}>
                          {zone.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Depth: {zone.depth}m</div>
                        <div>Avg. Catch: {zone.avgCatchRate} kg/trip</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {mapLayer === 'catches' && (
                <>
                  <h4 className="font-medium text-sm text-muted-foreground">RECENT CATCH POINTS</h4>
                  {mockCatchRecords.slice(0, 5).map((record) => (
                    <div
                      key={record.id}
                      className="p-3 rounded-lg border hover:bg-accent/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm text-foreground">{record.species.join(', ')}</h5>
                        <Badge variant="outline">{record.totalWeight} kg</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Date: {record.date}</div>
                        <div>Fisher: {record.fisherName}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {mapLayer === 'weather' && (
                <>
                  <h4 className="font-medium text-sm text-muted-foreground">WEATHER CONDITIONS</h4>
                  {mockWeatherData.map((weather) => (
                    <div
                      key={weather.id}
                      className="p-3 rounded-lg border hover:bg-accent/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm text-foreground">{weather.location}</h5>
                        <Badge variant="outline">{weather.condition}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Temp: {weather.temperature}°C</div>
                        <div>Wind: {weather.windSpeed} km/h</div>
                        <div>Waves: {weather.waveHeight}m</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Interactive Map - Virac Waters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveMap 
              zones={mockFishingZones}
              onZoneClick={setSelectedZone}
              selectedZoneId={selectedZone}
              showCatchPoints={mapLayer === 'catches'}
              showWeatherData={mapLayer === 'weather'}
              height="500px"
            />
          </CardContent>
        </Card>

        {/* Zone Details Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Zone Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedZoneData ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedZoneData.name}</h3>
                  <Badge className={getStatusColor(selectedZoneData.status)}>
                    {selectedZoneData.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                    <p className="text-sm text-foreground">
                      {selectedZoneData.coordinates.lat.toFixed(4)}°N, {selectedZoneData.coordinates.lng.toFixed(4)}°E
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Average Catch Rate</label>
                    <p className="text-lg font-semibold text-foreground">{selectedZoneData.avgCatchRate} kg/trip</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Depth</label>
                    <p className="text-sm text-foreground">{selectedZoneData.depth} meters</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Substrate</label>
                    <p className="text-sm text-foreground">{selectedZoneData.substrate}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Primary Species</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedZoneData.primarySpecies.map((species) => (
                        <Badge key={species} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Survey</label>
                    <p className="text-sm text-foreground">{selectedZoneData.lastSurvey}</p>
                  </div>

                  {selectedZoneData.restrictions && (
                    <div>
                      <label className="text-sm font-medium text-destructive">Restrictions</label>
                      <p className="text-sm text-destructive">{selectedZoneData.restrictions}</p>
                    </div>
                  )}
                </div>

                <Button className="w-full" size="sm">
                  Generate Zone Report
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select a fishing zone on the map to view detailed information
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GISMapping;