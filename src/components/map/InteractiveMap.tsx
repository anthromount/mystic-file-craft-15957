import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FishingZone, CatchRecord, WeatherData } from '@/lib/mockData';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface InteractiveMapProps {
  zones: FishingZone[];
  onZoneClick?: (zoneId: string) => void;
  selectedZoneId?: string | null;
  showCatchPoints?: boolean;
  showWeatherData?: boolean;
  catchRecords?: CatchRecord[];
  onCatchClick?: (catchId: string) => void;
  selectedCatchId?: string | null;
  weatherData?: WeatherData[];
  onWeatherClick?: (weatherId: string) => void;
  selectedWeatherId?: string | null;
  height?: string;
}

const statusColors = {
  optimal: '#22c55e',
  good: '#0ea5e9',
  poor: '#f59e0b',
  restricted: '#ef4444'
};

const InteractiveMap = ({ 
  zones, 
  onZoneClick, 
  selectedZoneId,
  showCatchPoints = false,
  showWeatherData = false,
  catchRecords = [],
  onCatchClick,
  selectedCatchId,
  weatherData = [],
  onWeatherClick,
  selectedWeatherId,
  height = '400px'
}: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layersRef = useRef<Map<string, L.Polygon | L.Circle | L.CircleMarker | L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Virac, Catanduanes
    map.current = L.map(mapContainer.current).setView([13.5827, 124.2337], 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing layers
    layersRef.current.forEach(layer => layer.remove());
    layersRef.current.clear();

    // Show fishing zones layer
    if (!showCatchPoints && !showWeatherData) {
      zones.forEach(zone => {
        if (!map.current) return;

        const color = statusColors[zone.status];
        const isSelected = selectedZoneId === zone.id;

        // Create polygon if boundary exists, otherwise use circle
        if (zone.boundary && zone.boundary.length > 0) {
          const polygon = L.polygon(
            zone.boundary.map(p => [p.lat, p.lng] as [number, number]),
            {
              color: color,
              fillColor: color,
              fillOpacity: isSelected ? 0.4 : 0.2,
              weight: isSelected ? 3 : 2,
              dashArray: zone.status === 'restricted' ? '5, 5' : undefined
            }
          ).addTo(map.current);

          polygon.on('click', () => {
            if (onZoneClick) {
              onZoneClick(zone.id);
            }
          });

          layersRef.current.set(`polygon-${zone.id}`, polygon);
        } else {
          const circle = L.circle([zone.coordinates.lat, zone.coordinates.lng], {
            color: color,
            fillColor: color,
            fillOpacity: isSelected ? 0.4 : 0.2,
            radius: 2000,
            weight: isSelected ? 3 : 2,
          }).addTo(map.current);

          circle.on('click', () => {
            if (onZoneClick) {
              onZoneClick(zone.id);
            }
          });

          layersRef.current.set(`circle-${zone.id}`, circle);
        }

        const marker = L.marker([zone.coordinates.lat, zone.coordinates.lng])
          .addTo(map.current)
          .bindPopup(`
            <div style="padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
              <strong style="font-size: 14px; color: ${color};">${zone.name}</strong><br/>
              <span style="font-size: 12px; color: #666;">Status: ${zone.status}</span><br/>
              ${zone.avgCatchRate > 0 ? 
                `<span style="font-size: 12px; color: #666;">Avg: ${zone.avgCatchRate} kg/trip</span>` : 
                `<span style="font-size: 12px; color: #ef4444;">Restricted Area</span>`
              }
            </div>
          `);

        marker.on('click', () => {
          if (onZoneClick) {
            onZoneClick(zone.id);
          }
        });

        layersRef.current.set(`marker-${zone.id}`, marker);
      });
    }

    // Show catch points layer
    if (showCatchPoints && catchRecords.length > 0) {
      catchRecords.forEach(record => {
        if (!map.current) return;

        const isSelected = selectedCatchId === record.id;
        const heatIntensity = record.totalWeight / 20; // Scale catch weight
        const marker = L.circleMarker([record.coordinates.lat, record.coordinates.lng], {
          radius: isSelected ? 12 : 8 + heatIntensity * 2,
          fillColor: record.totalWeight > 15 ? '#ef4444' : record.totalWeight > 10 ? '#f59e0b' : '#22c55e',
          color: isSelected ? '#0ea5e9' : '#fff',
          weight: isSelected ? 3 : 2,
          opacity: 1,
          fillOpacity: isSelected ? 0.9 : 0.7
        }).addTo(map.current);

        marker.bindPopup(`
          <div style="padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
            <strong style="font-size: 14px;">${record.location}</strong><br/>
            <span style="font-size: 12px; color: #666;">Catch: ${record.totalWeight} kg</span><br/>
            <span style="font-size: 12px; color: #666;">Species: ${record.species.join(', ')}</span><br/>
            <span style="font-size: 12px; color: #666;">Fisher: ${record.fisherName}</span>
          </div>
        `);

        marker.on('click', () => {
          if (onCatchClick) {
            onCatchClick(record.id);
          }
        });

        layersRef.current.set(`catch-${record.id}`, marker);
      });
    }

    // Show weather data layer
    if (showWeatherData && weatherData.length > 0) {
      weatherData.forEach(weather => {
        if (!map.current) return;

        // Find corresponding zone for coordinates
        const zone = zones.find(z => z.name.toLowerCase().includes(weather.location.toLowerCase().split(',')[0]));
        if (!zone) return;

        const isSelected = selectedWeatherId === weather.id;
        const weatherColor = weather.condition === 'stormy' || weather.condition === 'rainy' ? '#ef4444' : 
                           weather.condition === 'cloudy' ? '#f59e0b' : '#0ea5e9';
        
        const circle = L.circle([zone.coordinates.lat, zone.coordinates.lng], {
          color: weatherColor,
          fillColor: weatherColor,
          fillOpacity: isSelected ? 0.25 : 0.15,
          radius: 3000,
          weight: isSelected ? 2 : 1,
          dashArray: '5, 10'
        }).addTo(map.current);

        const marker = L.marker([zone.coordinates.lat, zone.coordinates.lng])
          .addTo(map.current)
          .bindPopup(`
            <div style="padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
              <strong style="font-size: 14px;">${weather.location}</strong><br/>
              <span style="font-size: 12px; color: #666;">Condition: ${weather.condition}</span><br/>
              <span style="font-size: 12px; color: #666;">Temp: ${weather.temperature}°C</span><br/>
              <span style="font-size: 12px; color: #666;">Wind: ${weather.windSpeed} km/h ${weather.windDirection}</span><br/>
              <span style="font-size: 12px; color: #666;">Waves: ${weather.waveHeight}m</span>
            </div>
          `);

        marker.on('click', () => {
          if (onWeatherClick) {
            onWeatherClick(weather.id);
          }
        });

        circle.on('click', () => {
          if (onWeatherClick) {
            onWeatherClick(weather.id);
          }
        });

        layersRef.current.set(`weather-circle-${weather.id}`, circle);
        layersRef.current.set(`weather-marker-${weather.id}`, marker);
      });
    }
  }, [zones, onZoneClick, selectedZoneId, showCatchPoints, showWeatherData, catchRecords, onCatchClick, selectedCatchId, weatherData, onWeatherClick, selectedWeatherId]);

  return (
    <div 
      ref={mapContainer} 
      style={{ height, width: '100%' }} 
      className="rounded-lg overflow-hidden border border-border"
    />
  );
};

export default InteractiveMap;
