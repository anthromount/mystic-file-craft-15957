import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Fish,
  User,
  Calendar,
  MapPin,
  TrendingUp,
  Save,
  Upload,
  Camera,
  Plus,
  Trash2,
  CheckCircle,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Waves,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { mockFishers, mockFishingZones, commonSpecies, gearTypes, weatherConditions } from '@/lib/mockData';
import Header from '@/components/layout/Header';

const DataCollection = () => {
  const { toast } = useToast();
  const [catchData, setCatchData] = useState({
    fisherId: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    coordinates: { lat: '', lng: '' },
    species: [] as string[],
    totalWeight: '',
    marketValue: '',
    gear: '',
    tripDuration: '',
    fuelCost: '',
    crewSize: '',
    weatherConditions: '',
    notes: ''
  });

  const [fisherData, setFisherData] = useState({
    name: '',
    barangay: '',
    phone: '',
    email: '',
    boatType: '',
    licenseNumber: '',
    status: 'active'
  });

  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [newSpecies, setNewSpecies] = useState('');

  const [observationData, setObservationData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    location: '',
    coordinates: { lat: '', lng: '' },
    observerName: '',
    // Environmental Conditions
    waterTemp: '',
    waterClarity: '',
    seaState: '',
    currentStrength: '',
    tideInfo: '',
    // Weather Observations
    skyConditions: '',
    windSpeed: '',
    windDirection: '',
    precipitation: '',
    airTemp: '',
    // Ecosystem Health
    marineDebris: '',
    algaeBloom: '',
    marineSightings: '',
    coralHealth: '',
    fishBehavior: '',
    notes: ''
  });

  const handleSpeciesToggle = (species: string) => {
    setSelectedSpecies(prev => 
      prev.includes(species) 
        ? prev.filter(s => s !== species)
        : [...prev, species]
    );
  };

  const addCustomSpecies = () => {
    if (newSpecies && !selectedSpecies.includes(newSpecies)) {
      setSelectedSpecies(prev => [...prev, newSpecies]);
      setNewSpecies('');
    }
  };

  const handleCatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!catchData.fisherId || !catchData.location || selectedSpecies.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const formData = {
      ...catchData,
      species: selectedSpecies,
      totalWeight: parseFloat(catchData.totalWeight),
      marketValue: parseFloat(catchData.marketValue)
    };

    console.log('Catch data submitted:', formData);
    
    toast({
      title: "Catch Record Saved",
      description: `Successfully recorded catch for ${mockFishers.find(f => f.id === catchData.fisherId)?.name}`,
    });

    // Reset form
    setCatchData({
      fisherId: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      coordinates: { lat: '', lng: '' },
      species: [],
      totalWeight: '',
      marketValue: '',
      gear: '',
      tripDuration: '',
      fuelCost: '',
      crewSize: '',
      weatherConditions: '',
      notes: ''
    });
    setSelectedSpecies([]);
  };

  const handleFisherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fisherData.name || !fisherData.barangay || !fisherData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Fisher data submitted:', fisherData);
    
    toast({
      title: "Fisher Registered",
      description: `Successfully registered ${fisherData.name}`,
    });

    // Reset form
    setFisherData({
      name: '',
      barangay: '',
      phone: '',
      email: '',
      boatType: '',
      licenseNumber: '',
      status: 'active'
    });
  };

  const handleObservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!observationData.location || !observationData.observerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Observation data submitted:', observationData);
    
    toast({
      title: "Observation Recorded",
      description: `Field observation successfully saved for ${observationData.location}`,
    });

    // Reset form
    setObservationData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      location: '',
      coordinates: { lat: '', lng: '' },
      observerName: '',
      waterTemp: '',
      waterClarity: '',
      seaState: '',
      currentStrength: '',
      tideInfo: '',
      skyConditions: '',
      windSpeed: '',
      windDirection: '',
      precipitation: '',
      airTemp: '',
      marineDebris: '',
      algaeBloom: '',
      marineSightings: '',
      coralHealth: '',
      fishBehavior: '',
      notes: ''
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Data Collection Center</h1>
        <p className="text-muted-foreground">Record catch data, register fishers, and collect field observations</p>
      </div>

      <Tabs defaultValue="catch-report" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-1 md:grid-cols-3 gap-2 h-auto">
          <TabsTrigger value="catch-report" className="flex items-center space-x-2">
            <Fish className="h-4 w-4" />
            <span>Catch Report</span>
          </TabsTrigger>
          <TabsTrigger value="fisher-registration" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Fisher Registration</span>
          </TabsTrigger>
          <TabsTrigger value="field-observations" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Field Observations</span>
          </TabsTrigger>
        </TabsList>

        {/* Catch Report Form */}
        <TabsContent value="catch-report">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Fish className="h-5 w-5" />
                  <span>Catch Report Form</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCatchSubmit} className="space-y-6">
                  {/* Fisher and Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fisher">Fisher *</Label>
                      <Select value={catchData.fisherId} onValueChange={(value) => setCatchData(prev => ({ ...prev, fisherId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fisher" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockFishers.map((fisher) => (
                            <SelectItem key={fisher.id} value={fisher.id}>
                              {fisher.name} - {fisher.barangay}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={catchData.date}
                        onChange={(e) => setCatchData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="location">Fishing Location *</Label>
                      <Select value={catchData.location} onValueChange={(value) => setCatchData(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockFishingZones.map((zone) => (
                            <SelectItem key={zone.id} value={zone.name}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="lat">Latitude</Label>
                      <Input
                        id="lat"
                        placeholder="13.5827"
                        value={catchData.coordinates.lat}
                        onChange={(e) => setCatchData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lat: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="lng">Longitude</Label>
                      <Input
                        id="lng"
                        placeholder="124.2337"
                        value={catchData.coordinates.lng}
                        onChange={(e) => setCatchData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lng: e.target.value }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Species Selection */}
                  <div>
                    <Label>Fish Species Caught *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {commonSpecies.map((species) => (
                        <div key={species} className="flex items-center space-x-2">
                          <Checkbox
                            id={species}
                            checked={selectedSpecies.includes(species)}
                            onCheckedChange={() => handleSpeciesToggle(species)}
                          />
                          <Label htmlFor={species} className="text-sm">{species}</Label>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Custom Species */}
                    <div className="flex items-center space-x-2 mt-3">
                      <Input
                        placeholder="Add other species..."
                        value={newSpecies}
                        onChange={(e) => setNewSpecies(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={addCustomSpecies}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Selected Species Display */}
                    {selectedSpecies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedSpecies.map((species) => (
                          <Badge key={species} variant="secondary" className="flex items-center space-x-1">
                            <span>{species}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedSpecies(prev => prev.filter(s => s !== species))}
                              className="ml-1 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Catch Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight">Total Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={catchData.totalWeight}
                        onChange={(e) => setCatchData(prev => ({ ...prev, totalWeight: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="value">Market Value (₱)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={catchData.marketValue}
                        onChange={(e) => setCatchData(prev => ({ ...prev, marketValue: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="gear">Fishing Gear</Label>
                      <Select value={catchData.gear} onValueChange={(value) => setCatchData(prev => ({ ...prev, gear: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gear" />
                        </SelectTrigger>
                        <SelectContent>
                          {gearTypes.map((gear) => (
                            <SelectItem key={gear} value={gear}>
                              {gear}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="duration">Trip Duration (hours)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={catchData.tripDuration}
                        onChange={(e) => setCatchData(prev => ({ ...prev, tripDuration: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fuel">Fuel Cost (₱)</Label>
                      <Input
                        id="fuel"
                        type="number"
                        value={catchData.fuelCost}
                        onChange={(e) => setCatchData(prev => ({ ...prev, fuelCost: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="crew">Crew Size</Label>
                      <Input
                        id="crew"
                        type="number"
                        value={catchData.crewSize}
                        onChange={(e) => setCatchData(prev => ({ ...prev, crewSize: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="weather">Weather Conditions</Label>
                      <Select value={catchData.weatherConditions} onValueChange={(value) => setCatchData(prev => ({ ...prev, weatherConditions: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {weatherConditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional observations, unusual catches, or environmental conditions..."
                      value={catchData.notes}
                      onChange={(e) => setCatchData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <Label>Photo Evidence</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload photos of catch</p>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Catch Report
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Reports Submitted</div>
                </div>
                
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">156.8 kg</div>
                  <div className="text-sm text-muted-foreground">Total Catch</div>
                </div>
                
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent-coral">₱34,250</div>
                  <div className="text-sm text-muted-foreground">Market Value</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">TOP SPECIES TODAY</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tuna</span>
                      <span className="font-medium">45.2 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mackerel</span>
                      <span className="font-medium">32.1 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sardines</span>
                      <span className="font-medium">28.5 kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fisher Registration Form */}
        <TabsContent value="fisher-registration">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Fisher Registration Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFisherSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fisher-name">Full Name *</Label>
                    <Input
                      id="fisher-name"
                      value={fisherData.name}
                      onChange={(e) => setFisherData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="barangay">Barangay *</Label>
                    <Select value={fisherData.barangay} onValueChange={(value) => setFisherData(prev => ({ ...prev, barangay: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select barangay" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Balite">Balite</SelectItem>
                        <SelectItem value="San Miguel">San Miguel</SelectItem>
                        <SelectItem value="Carangay">Carangay</SelectItem>
                        <SelectItem value="Salvacion">Salvacion</SelectItem>
                        <SelectItem value="San Roque">San Roque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+63-912-345-6789"
                      value={fisherData.phone}
                      onChange={(e) => setFisherData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={fisherData.email}
                      onChange={(e) => setFisherData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="boat-type">Boat Type</Label>
                    <Select value={fisherData.boatType} onValueChange={(value) => setFisherData(prev => ({ ...prev, boatType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select boat type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bancor">Bancor</SelectItem>
                        <SelectItem value="Motorized Banca">Motorized Banca</SelectItem>
                        <SelectItem value="Paddle Boat">Paddle Boat</SelectItem>
                        <SelectItem value="Fishing Vessel">Fishing Vessel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      placeholder="FL-2024-XXX"
                      value={fisherData.licenseNumber}
                      onChange={(e) => setFisherData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Register Fisher
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Field Observations */}
        <TabsContent value="field-observations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Field Observations Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleObservationSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Basic Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="obs-date">Date *</Label>
                      <Input
                        id="obs-date"
                        type="date"
                        value={observationData.date}
                        onChange={(e) => setObservationData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="obs-time">Time *</Label>
                      <Input
                        id="obs-time"
                        type="time"
                        value={observationData.time}
                        onChange={(e) => setObservationData(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="obs-observer">Observer Name *</Label>
                      <Input
                        id="obs-observer"
                        placeholder="Your name"
                        value={observationData.observerName}
                        onChange={(e) => setObservationData(prev => ({ ...prev, observerName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="obs-location">Location/Zone *</Label>
                      <Select value={observationData.location} onValueChange={(value) => setObservationData(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockFishingZones.map((zone) => (
                            <SelectItem key={zone.id} value={zone.name}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="obs-lat">Latitude</Label>
                      <Input
                        id="obs-lat"
                        placeholder="13.5827"
                        value={observationData.coordinates.lat}
                        onChange={(e) => setObservationData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lat: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="obs-lng">Longitude</Label>
                      <Input
                        id="obs-lng"
                        placeholder="124.2337"
                        value={observationData.coordinates.lng}
                        onChange={(e) => setObservationData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lng: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Waves className="h-5 w-5" />
                    <span>Environmental Conditions</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="water-temp">Water Temperature (°C)</Label>
                      <Input
                        id="water-temp"
                        type="number"
                        step="0.1"
                        placeholder="28.5"
                        value={observationData.waterTemp}
                        onChange={(e) => setObservationData(prev => ({ ...prev, waterTemp: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="water-clarity">Water Clarity</Label>
                      <Select value={observationData.waterClarity} onValueChange={(value) => setObservationData(prev => ({ ...prev, waterClarity: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select clarity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clear">Clear</SelectItem>
                          <SelectItem value="Slightly Turbid">Slightly Turbid</SelectItem>
                          <SelectItem value="Turbid">Turbid</SelectItem>
                          <SelectItem value="Very Turbid">Very Turbid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sea-state">Sea State</Label>
                      <Select value={observationData.seaState} onValueChange={(value) => setObservationData(prev => ({ ...prev, seaState: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sea state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Calm">Calm</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Rough">Rough</SelectItem>
                          <SelectItem value="Very Rough">Very Rough</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="current-strength">Current Strength</Label>
                      <Select value={observationData.currentStrength} onValueChange={(value) => setObservationData(prev => ({ ...prev, currentStrength: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select current" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weak">Weak</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Strong">Strong</SelectItem>
                          <SelectItem value="Very Strong">Very Strong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tide-info">Tide Information</Label>
                      <Select value={observationData.tideInfo} onValueChange={(value) => setObservationData(prev => ({ ...prev, tideInfo: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tide" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High Tide">High Tide</SelectItem>
                          <SelectItem value="Low Tide">Low Tide</SelectItem>
                          <SelectItem value="Rising">Rising</SelectItem>
                          <SelectItem value="Falling">Falling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Weather Observations */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Cloud className="h-5 w-5" />
                    <span>Weather Observations</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sky-conditions">Sky Conditions</Label>
                      <Select value={observationData.skyConditions} onValueChange={(value) => setObservationData(prev => ({ ...prev, skyConditions: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sky condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clear">Clear</SelectItem>
                          <SelectItem value="Partly Cloudy">Partly Cloudy</SelectItem>
                          <SelectItem value="Cloudy">Cloudy</SelectItem>
                          <SelectItem value="Overcast">Overcast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="wind-speed">Wind Speed (km/h)</Label>
                      <Input
                        id="wind-speed"
                        type="number"
                        placeholder="15"
                        value={observationData.windSpeed}
                        onChange={(e) => setObservationData(prev => ({ ...prev, windSpeed: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wind-direction">Wind Direction</Label>
                      <Select value={observationData.windDirection} onValueChange={(value) => setObservationData(prev => ({ ...prev, windDirection: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North">North</SelectItem>
                          <SelectItem value="Northeast">Northeast</SelectItem>
                          <SelectItem value="East">East</SelectItem>
                          <SelectItem value="Southeast">Southeast</SelectItem>
                          <SelectItem value="South">South</SelectItem>
                          <SelectItem value="Southwest">Southwest</SelectItem>
                          <SelectItem value="West">West</SelectItem>
                          <SelectItem value="Northwest">Northwest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="precipitation">Precipitation</Label>
                      <Select value={observationData.precipitation} onValueChange={(value) => setObservationData(prev => ({ ...prev, precipitation: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select precipitation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Light Rain">Light Rain</SelectItem>
                          <SelectItem value="Moderate Rain">Moderate Rain</SelectItem>
                          <SelectItem value="Heavy Rain">Heavy Rain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="air-temp">Air Temperature (°C)</Label>
                      <Input
                        id="air-temp"
                        type="number"
                        step="0.1"
                        placeholder="32.0"
                        value={observationData.airTemp}
                        onChange={(e) => setObservationData(prev => ({ ...prev, airTemp: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Ecosystem Health Indicators */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Ecosystem Health Indicators</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="marine-debris">Marine Debris/Pollution</Label>
                      <Select value={observationData.marineDebris} onValueChange={(value) => setObservationData(prev => ({ ...prev, marineDebris: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="algae-bloom">Algae Bloom Presence</Label>
                      <Select value={observationData.algaeBloom} onValueChange={(value) => setObservationData(prev => ({ ...prev, algaeBloom: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Minor">Minor</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="marine-sightings">Marine Life Sightings</Label>
                      <Input
                        id="marine-sightings"
                        placeholder="e.g., Dolphins, Sea turtles, Jellyfish"
                        value={observationData.marineSightings}
                        onChange={(e) => setObservationData(prev => ({ ...prev, marineSightings: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coral-health">Coral Health Observation</Label>
                      <Select value={observationData.coralHealth} onValueChange={(value) => setObservationData(prev => ({ ...prev, coralHealth: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select health" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Healthy">Healthy</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Bleached">Bleached</SelectItem>
                          <SelectItem value="Damaged">Damaged</SelectItem>
                          <SelectItem value="Not Observed">Not Observed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="fish-behavior">Fish Behavior Anomalies</Label>
                      <Input
                        id="fish-behavior"
                        placeholder="e.g., Unusual schooling patterns, stressed fish"
                        value={observationData.fishBehavior}
                        onChange={(e) => setObservationData(prev => ({ ...prev, fishBehavior: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Notes and Photo Upload */}
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label htmlFor="obs-notes">Additional Observations & Notes</Label>
                    <Textarea
                      id="obs-notes"
                      placeholder="Record any additional environmental observations, unusual conditions, or concerns..."
                      value={observationData.notes}
                      onChange={(e) => setObservationData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Photo Documentation</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload photos of environmental conditions</p>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Field Observation
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </>
  );
};

export default DataCollection;