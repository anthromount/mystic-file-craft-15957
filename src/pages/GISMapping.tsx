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
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { mockFishingZones, mockCatchRecords, mockWeatherData } from '@/lib/mockData';

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

            {/* Zone List */}
            <div className="space-y-2">
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
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Interactive Map - Virac Waters</span>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Enhanced Map Visualization */}
            <div className="relative h-96 rounded-lg bg-gradient-to-br from-primary/5 via-primary-light/10 to-accent/5 border overflow-hidden">
              {/* Water Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-primary/10"></div>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
              </div>

              {/* Fishing Zones */}
              {mapLayer === 'zones' && mockFishingZones.map((zone, index) => {
                const positions = [
                  { top: '20%', left: '25%' },
                  { top: '50%', right: '20%' },
                  { bottom: '25%', left: '50%' }
                ];
                const position = positions[index] || positions[0];
                const isSelected = selectedZone === zone.id;
                
                return (
                  <div
                    key={zone.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={position}
                    onClick={() => setSelectedZone(zone.id)}
                  >
                    {/* Zone Boundary */}
                    <div className={`absolute -inset-8 border-2 border-dashed rounded-lg transition-all ${
                      zone.status === 'optimal' ? 'border-success/60' :
                      zone.status === 'good' ? 'border-primary/60' :
                      zone.status === 'restricted' ? 'border-destructive/60' :
                      'border-warning/60'
                    } ${isSelected ? 'border-solid scale-110' : 'group-hover:border-solid'}`}></div>
                    
                    {/* Zone Marker */}
                    <div className={`relative h-4 w-4 rounded-full animate-pulse ${
                      zone.status === 'optimal' ? 'bg-success' :
                      zone.status === 'good' ? 'bg-primary' :
                      zone.status === 'restricted' ? 'bg-destructive' :
                      'bg-warning'
                    }`}>
                      <div className={`absolute -inset-1 rounded-full opacity-30 ${
                        zone.status === 'optimal' ? 'bg-success' :
                        zone.status === 'good' ? 'bg-primary' :
                        zone.status === 'restricted' ? 'bg-destructive' :
                        'bg-warning'
                      } animate-ping`}></div>
                    </div>
                    
                    {/* Zone Label */}
                    <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur rounded px-2 py-1 text-xs font-medium shadow-surface whitespace-nowrap transition-all ${
                      isSelected ? 'scale-110 bg-primary text-primary-foreground' : 'group-hover:scale-105'
                    }`}>
                      {zone.name}
                    </div>
                  </div>
                );
              })}

              {/* Catch Points */}
              {mapLayer === 'catches' && mockCatchRecords.map((record, index) => {
                const positions = [
                  { top: '30%', left: '35%' },
                  { top: '60%', right: '25%' },
                  { bottom: '35%', left: '60%' }
                ];
                const position = positions[index] || positions[0];
                
                return (
                  <div
                    key={record.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={position}
                  >
                    <div className="relative h-3 w-3 bg-accent-coral rounded-full">
                      <div className="absolute -inset-1 bg-accent-coral-light rounded-full opacity-50 animate-pulse"></div>
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur rounded px-2 py-1 text-xs shadow-surface opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {record.totalWeight}kg - {record.species.join(', ')}
                    </div>
                  </div>
                );
              })}

              {/* Map Legend */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 shadow-surface">
                <div className="text-xs font-medium text-foreground mb-2">Legend</div>
                <div className="space-y-1">
                  {mapLayer === 'zones' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Optimal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Good</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-warning rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Poor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-destructive rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Restricted</span>
                      </div>
                    </>
                  )}
                  {mapLayer === 'catches' && (
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-accent-coral rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Catch Points</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
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