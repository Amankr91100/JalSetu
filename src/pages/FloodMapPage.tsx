import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import {
  Layers,
  Search,
  Locate,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { floodExtentGeoJSON, riskZonesGeoJSON, shelters } from '../data/mockData';
import { RiskBadge } from '../components/RiskBadge';
import { cn } from '../utils/cn';

const LAYER_DEFS = [
  { id: 'flood', name: 'Flood extent', color: '#1890ff', defaultOn: true },
  { id: 'risk', name: 'Risk zones', color: '#faad14', defaultOn: true },
  { id: 'shelters', name: 'Shelters', color: '#52c41a', defaultOn: true },
  { id: 'roads', name: 'Roads', color: '#829ab1', defaultOn: false },
  { id: 'infra', name: 'Critical infrastructure', color: '#f5222d', defaultOn: false },
  { id: 'routes', name: 'Evacuation routes', color: '#13c2c2', defaultOn: false },
];

export function FloodMapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [layers, setLayers] = useState(
    Object.fromEntries(LAYER_DEFS.map((l) => [l.id, l.defaultOn]))
  );
  const [panelOpen, setPanelOpen] = useState(true);
  const [layerSheetOpen, setLayerSheetOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({
    location: 'Assam Valley – North Bank',
    status: 'Inundated',
    risk: 'critical' as const,
    area: '42.3 km²',
    sheltersNearby: 3,
    hospitalsNearby: 1,
    action: 'Prioritise evacuation of Zone A clusters. Open overflow shelters.',
  });

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [91.7, 26.2],
      zoom: 9,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), 'bottom-left');

    map.on('load', () => {
      // Flood extent
      map.addSource('flood-extent', {
        type: 'geojson',
        data: floodExtentGeoJSON as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: 'flood-fill',
        type: 'fill',
        source: 'flood-extent',
        paint: {
          'fill-color': [
            'match',
            ['get', 'risk'],
            'critical', '#f5222d',
            'high', '#fa8c16',
            '#1890ff',
          ],
          'fill-opacity': 0.45,
        },
      });
      map.addLayer({
        id: 'flood-outline',
        type: 'line',
        source: 'flood-extent',
        paint: {
          'line-color': [
            'match',
            ['get', 'risk'],
            'critical', '#cf1322',
            'high', '#d46b08',
            '#096dd9',
          ],
          'line-width': 2,
        },
      });

      // Risk zones
      map.addSource('risk-zones', {
        type: 'geojson',
        data: riskZonesGeoJSON as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: 'risk-fill',
        type: 'fill',
        source: 'risk-zones',
        paint: {
          'fill-color': '#faad14',
          'fill-opacity': 0.25,
        },
      });

      // Shelter markers
      shelters.forEach((s) => {
        const el = document.createElement('div');
        el.className = 'w-3 h-3 rounded-full bg-success-500 border-2 border-white shadow';
        el.title = s.name;
        new maplibregl.Marker({ element: el })
          .setLngLat([s.longitude, s.latitude])
          .setPopup(
            new maplibregl.Popup({ offset: 12 }).setHTML(
              `<strong>${s.name}</strong><br/>Available: ${s.available}/${s.capacity}`
            )
          )
          .addTo(map);
      });
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const visibility = (id: string, on: boolean) => {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');
      }
    };
    visibility('flood-fill', layers.flood);
    visibility('flood-outline', layers.flood);
    visibility('risk-fill', layers.risk);
  }, [layers]);

  const toggleLayer = (id: string) => {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] -m-3 sm:-m-6 flex flex-col">
      {/* Map */}
      <div ref={mapContainer} className="flex-1 w-full min-h-0" />

      {/* Top controls */}
      <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-auto flex flex-col sm:flex-row gap-2 z-10 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="search"
            placeholder="Search location…"
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-navy-200 rounded-lg shadow-card focus:outline-none focus:ring-2 focus:ring-flood-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="p-2.5 bg-white border border-navy-200 rounded-lg shadow-card hover:bg-navy-50"
            title="Current location"
            aria-label="Current location"
            onClick={() => mapRef.current?.flyTo({ center: [91.7, 26.2], zoom: 10 })}
          >
            <Locate className="w-4 h-4 text-navy-600" />
          </button>
          <button
            className="p-2.5 bg-white border border-navy-200 rounded-lg shadow-card hover:bg-navy-50 lg:hidden"
            onClick={() => setLayerSheetOpen(!layerSheetOpen)}
            aria-label="Layers"
          >
            <Layers className="w-4 h-4 text-navy-600" />
          </button>
        </div>
      </div>

      {/* Desktop layer control */}
      <div className="hidden lg:block absolute top-3 right-14 z-10 w-56 glass-card rounded-xl p-3 shadow-card">
        <p className="text-xs font-semibold text-navy-700 mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Layers
        </p>
        <div className="space-y-1.5">
          {LAYER_DEFS.map((l) => (
            <label key={l.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={layers[l.id]}
                onChange={() => toggleLayer(l.id)}
                className="rounded border-navy-300 text-flood-600 focus:ring-flood-500"
              />
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-navy-700">{l.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-24 sm:bottom-4 left-3 z-10 glass-card rounded-lg p-2.5 text-xs shadow-card">
        <p className="font-semibold text-navy-700 mb-1.5">Legend</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-flood-500/60 border border-flood-600" /> Flood / water</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-warning-400/60 border border-warning-600" /> Moderate risk</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-orange-500/60 border border-orange-600" /> High risk</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-danger-500/60 border border-danger-600" /> Critical</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-success-500 border-2 border-white" /> Shelter</div>
        </div>
      </div>

      {/* Mobile layer sheet */}
      {layerSheetOpen && (
        <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-navy-200 rounded-t-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-navy-900">Map layers</p>
            <button onClick={() => setLayerSheetOpen(false)} className="text-navy-500">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {LAYER_DEFS.map((l) => (
              <label key={l.id} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-navy-50">
                <input
                  type="checkbox"
                  checked={layers[l.id]}
                  onChange={() => toggleLayer(l.id)}
                  className="rounded border-navy-300 text-flood-600"
                />
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                {l.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Info panel */}
      <div
        className={cn(
          'absolute z-10 bg-white border border-navy-200 shadow-card transition-all',
          'bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80 sm:rounded-xl',
          !panelOpen && 'sm:translate-y-0'
        )}
      >
        <button
          className="w-full flex items-center justify-between px-4 py-3 border-b border-navy-100 sm:rounded-t-xl"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-navy-900">
            <Info className="w-4 h-4 text-flood-600" />
            Location info
          </span>
          {panelOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        {panelOpen && (
          <div className="p-4 space-y-3 text-sm">
            <div>
              <p className="text-xs text-navy-500">Selected location</p>
              <p className="font-medium text-navy-900">{selectedInfo.location}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-navy-500">Flood status</p>
                <p className="font-medium text-flood-700">{selectedInfo.status}</p>
              </div>
              <div>
                <p className="text-xs text-navy-500">Risk level</p>
                <RiskBadge level={selectedInfo.risk} />
              </div>
            </div>
            <div>
              <p className="text-xs text-navy-500">Est. affected area</p>
              <p className="font-medium">{selectedInfo.area}</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span>Nearby shelters: <strong>{selectedInfo.sheltersNearby}</strong></span>
              <span>Hospitals: <strong>{selectedInfo.hospitalsNearby}</strong></span>
            </div>
            <div className="pt-2 border-t border-navy-100">
              <p className="text-xs text-navy-500 mb-1">Recommended action</p>
              <p className="text-navy-700 text-sm">{selectedInfo.action}</p>
            </div>
            <p className="text-[10px] text-navy-400 uppercase tracking-wider">Demo · Mock selection</p>
          </div>
        )}
      </div>
    </div>
  );
}
