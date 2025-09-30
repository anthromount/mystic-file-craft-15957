import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FishingZone } from '@/lib/mockData';
import { useMapboxToken } from './MapboxConfig';

interface InteractiveMapProps {
  zones: FishingZone[];
  onZoneClick?: (zoneId: string) => void;
  selectedZoneId?: string | null;
  showCatchPoints?: boolean;
  height?: string;
}

const InteractiveMap = ({ 
  zones, 
  onZoneClick, 
  selectedZoneId,
  showCatchPoints = false,
  height = '400px'
}: InteractiveMapProps) => {
  const { token } = useMapboxToken();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!token || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    // Center on Virac, Catanduanes
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [124.2337, 13.5827], // Virac coordinates
      zoom: 11.5,
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [token]);

  // Add fishing zones
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    zones.forEach((zone) => {
      const zoneId = `zone-${zone.id}`;
      
      // Remove existing source and layers
      if (map.current!.getLayer(zoneId)) {
        map.current!.removeLayer(zoneId);
      }
      if (map.current!.getLayer(`${zoneId}-outline`)) {
        map.current!.removeLayer(`${zoneId}-outline`);
      }
      if (map.current!.getSource(zoneId)) {
        map.current!.removeSource(zoneId);
      }

      // Add zone polygon
      map.current!.addSource(zoneId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            id: zone.id,
            name: zone.name,
            status: zone.status,
            avgCatchRate: zone.avgCatchRate
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[...zone.boundary.map(p => [p.lng, p.lat]), [zone.boundary[0].lng, zone.boundary[0].lat]]]
          }
        }
      });

      // Zone fill color based on status
      const fillColor = 
        zone.status === 'optimal' ? '#22c55e' :
        zone.status === 'good' ? '#0ea5e9' :
        zone.status === 'poor' ? '#f59e0b' :
        '#ef4444';

      map.current!.addLayer({
        id: zoneId,
        type: 'fill',
        source: zoneId,
        paint: {
          'fill-color': fillColor,
          'fill-opacity': selectedZoneId === zone.id ? 0.4 : 0.2
        }
      });

      map.current!.addLayer({
        id: `${zoneId}-outline`,
        type: 'line',
        source: zoneId,
        paint: {
          'line-color': fillColor,
          'line-width': selectedZoneId === zone.id ? 3 : 2,
          'line-dasharray': zone.status === 'restricted' ? [2, 2] : [1]
        }
      });

      // Add click handler
      map.current!.on('click', zoneId, () => {
        onZoneClick?.(zone.id);
      });

      map.current!.on('mouseenter', zoneId, () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current!.on('mouseleave', zoneId, () => {
        map.current!.getCanvas().style.cursor = '';
      });

      // Add marker for zone center
      const markerEl = document.createElement('div');
      markerEl.className = 'mapbox-zone-marker';
      markerEl.style.width = '12px';
      markerEl.style.height = '12px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.backgroundColor = fillColor;
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="padding: 8px;">
          <strong style="font-size: 14px;">${zone.name}</strong><br/>
          <span style="font-size: 12px; color: #666;">Status: ${zone.status}</span><br/>
          ${zone.avgCatchRate > 0 ? 
            `<span style="font-size: 12px; color: #666;">Avg: ${zone.avgCatchRate} kg/trip</span>` : 
            `<span style="font-size: 12px; color: #ef4444;">Restricted Area</span>`
          }
        </div>`
      );

      new mapboxgl.Marker(markerEl)
        .setLngLat([zone.coordinates.lng, zone.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [zones, mapLoaded, selectedZoneId, onZoneClick]);

  if (!token) {
    return null;
  }

  return <div ref={mapContainer} style={{ width: '100%', height, borderRadius: '0.5rem' }} />;
};

export default InteractiveMap;
