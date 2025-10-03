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
import { FilterDialog } from '@/components/dialogs/FilterDialog';
import { exportToCSV, exportToJSON } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';
import InteractiveMap from '@/components/map/InteractiveMap';
import Header from '@/components/layout/Header';

const GISMapping = () => {
  const { toast } = useToast();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedCatch, setSelectedCatch] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
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

  const selectedCatchData = selectedCatch
    ? mockCatchRecords.find(record => record.id === selectedCatch)
    : null;

  const selectedWeatherData = selectedWeather
    ? mockWeatherData.find(weather => weather.id === selectedWeather)
    : null;

  const handleExport = () => {
    const dataToExport = mapLayer === 'zones' ? mockFishingZones : 
                         mapLayer === 'catches' ? mockCatchRecords : 
                         mockWeatherData;
    exportToCSV(dataToExport, `gis_${mapLayer}_data`);
    toast({
      title: "Export Successful",
      description: `${mapLayer} data has been exported to CSV`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Map data has been updated",
    });
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    toast({
      title: "Filters Applied",
      description: "Map data has been filtered based on your criteria",
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GIS Mapping System</h1>
          <p className="text-muted-foreground">Interactive mapping and spatial analysis for fishing zones</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleRefresh}>
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
                  {mockCatchRecords.map((record) => (
                    <div
                      key={record.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-surface ${
                        selectedCatch === record.id ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedCatch(record.id)}
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
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-surface ${
                        selectedWeather === weather.id ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedWeather(weather.id)}
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
              catchRecords={mockCatchRecords}
              onCatchClick={setSelectedCatch}
              selectedCatchId={selectedCatch}
              weatherData={mockWeatherData}
              onWeatherClick={setSelectedWeather}
              selectedWeatherId={selectedWeather}
              height="500px"
            />
          </CardContent>
        </Card>

        {/* Details Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>
              {mapLayer === 'zones' && 'Zone Details'}
              {mapLayer === 'catches' && 'Catch Details'}
              {mapLayer === 'weather' && 'Weather Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mapLayer === 'zones' && selectedZoneData ? (
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
            ) : mapLayer === 'zones' ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select a fishing zone on the map to view detailed information
                </p>
              </div>
            ) : null}

            {mapLayer === 'catches' && selectedCatchData ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedCatchData.location}</h3>
                  <Badge variant="outline">{selectedCatchData.date}</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fisher</label>
                    <p className="text-sm text-foreground">{selectedCatchData.fisherName}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                    <p className="text-sm text-foreground">
                      {selectedCatchData.coordinates.lat.toFixed(4)}°N, {selectedCatchData.coordinates.lng.toFixed(4)}°E
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Total Weight</label>
                    <p className="text-lg font-semibold text-foreground">{selectedCatchData.totalWeight} kg</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Market Value</label>
                    <p className="text-sm text-foreground">₱{selectedCatchData.marketValue.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Species Caught</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCatchData.species.map((species) => (
                        <Badge key={species} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gear Used</label>
                    <p className="text-sm text-foreground">{selectedCatchData.gear}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trip Duration</label>
                    <p className="text-sm text-foreground">{selectedCatchData.tripDuration} hours</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Crew Size</label>
                    <p className="text-sm text-foreground">{selectedCatchData.crewSize} persons</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Weather Conditions</label>
                    <p className="text-sm text-foreground">{selectedCatchData.weatherConditions}</p>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Generate Catch Report
                </Button>
              </div>
            ) : mapLayer === 'catches' ? (
              <div className="text-center py-8">
                <Fish className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select a catch point on the map to view detailed information
                </p>
              </div>
            ) : null}

            {mapLayer === 'weather' && selectedWeatherData ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedWeatherData.location}</h3>
                  <Badge variant="outline">{selectedWeatherData.date}</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Condition</label>
                    <p className="text-lg font-semibold text-foreground capitalize">{selectedWeatherData.condition}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Temperature</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.temperature}°C</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Humidity</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.humidity}%</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Wind</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.windSpeed} km/h {selectedWeatherData.windDirection}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Wave Height</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.waveHeight} meters</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Visibility</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.visibility} km</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Pressure</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.pressure} hPa</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">UV Index</label>
                    <p className="text-sm text-foreground">{selectedWeatherData.uvIndex}</p>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Generate Weather Report
                </Button>
              </div>
            ) : mapLayer === 'weather' ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select a weather point on the map to view detailed information
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
      
      <FilterDialog 
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApplyFilters={handleApplyFilters}
        type="gis"
      />
    </div>
    </>
  );
};

export default GISMapping;