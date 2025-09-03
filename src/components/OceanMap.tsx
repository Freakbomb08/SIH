import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Layers, X, Settings } from "lucide-react";

// Buoy and float data from OON site
const oceanBuoys = [
  { id: "AD08", lat: 12.156828, lon: 67.945488, status: "active", type: "buoy", lastProfile: "2024-01-14", temp: 27.8, salinity: 34.9 },
  { id: "AD06", lat: 18.266266, lon: 67.227509, status: "active", type: "buoy", lastProfile: "2024-01-15", temp: 28.5, salinity: 35.2 },
  { id: "AD10", lat: 10.301832, lon: 72.59124, status: "active", type: "buoy", lastProfile: "2024-01-13", temp: 28.7, salinity: 35.0 },
  { id: "CALVAL", lat: 10.49832, lon: 72.19752, status: "maintenance", type: "argo", lastProfile: "2024-01-12", temp: null, salinity: null },
  { id: "CB02", lat: 10.87912, lon: 72.21461, status: "active", type: "buoy", lastProfile: "2024-01-11", temp: 28.4, salinity: 34.8 },
  { id: "CB06", lat: 13.093099, lon: 80.30748, status: "active", type: "buoy", lastProfile: "2024-01-06", temp: 28.3, salinity: 35.0 },
  { id: "BD11", lat: 13.468, lon: 84.115, status: "inactive", type: "buoy", lastProfile: "2024-01-10", temp: null, salinity: null },
  { id: "BD13", lat: 14.005951, lon: 87.03067, status: "active", type: "buoy", lastProfile: "2024-01-08", temp: 28.0, salinity: 34.9 },
  { id: "BD10", lat: 16.354828, lon: 88.003662, status: "active", type: "buoy", lastProfile: "2024-01-11", temp: 28.2, salinity: 35.1 },
  { id: "BD14", lat: 6.568085, lon: 88.405579, status: "active", type: "buoy", lastProfile: "2024-01-07", temp: 27.7, salinity: 34.6 },
  { id: "CB01", lat: 11.589, lon: 92.595, status: "active", type: "buoy", lastProfile: "2024-01-13", temp: 29.0, salinity: 35.0 },
  { id: "BD12", lat: 10.552612, lon: 94.02533, status: "active", type: "buoy", lastProfile: "2024-01-09", temp: 27.9, salinity: 34.7 }
];

// Marker color based on status and type
const getMarkerColor = (status: string, type: string) => {
  if (status === "inactive") return "#6b7280"; // gray
  if (status === "maintenance") return "#f59e0b"; // amber
  switch (type) {
    case "argo": return "#10b981"; // green
    case "buoy": return "#3b82f6"; // blue
    case "omni": return "#8b5cf6"; // purple
    case "coastal": return "#f97316"; // orange
    default: return "#10b981";
  }
};

const OceanMapNew = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [currentBasemap, setCurrentBasemap] = useState("topographic");
  const [showLegend, setShowLegend] = useState(true);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = L.map(mapContainer.current).setView([15.5, 80.0], 5);

    const basemaps: Record<string, string> = {
      satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      topographic: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      dark: "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png",
      light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };

    const layer = L.tileLayer(basemaps[currentBasemap], {
      attribution: "&copy; Esri & OpenStreetMap contributors",
    });
    layer.addTo(map.current);

    // Update coordinates on mouse move
    map.current.on("mousemove", (e: any) => {
      setCoordinates({
        lat: parseFloat(e.latlng.lat.toFixed(4)),
        lng: parseFloat(e.latlng.lng.toFixed(4)),
      });
    });

    // Add markers for buoys
    oceanBuoys.forEach((buoy) => {
      const marker = L.circleMarker([buoy.lat, buoy.lon], {
        radius: 7,
        fillColor: getMarkerColor(buoy.status, buoy.type),
        color: "white",
        weight: 2,
        fillOpacity: 0.9,
      }).addTo(map.current!);

      marker.bindPopup(`
        <div>
          <b>${buoy.id}</b><br/>
          Status: ${buoy.status}<br/>
          Type: ${buoy.type}<br/>
          Last Profile: ${buoy.lastProfile}<br/>
          ${buoy.temp ? `Temp: ${buoy.temp}°C` : ""}
          ${buoy.salinity ? `<br/>Salinity: ${buoy.salinity} PSU` : ""}
        </div>
      `);
    });

    return () => {
      map.current?.remove();
    };
  }, [currentBasemap]);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Ocean Observation Network (Leaflet)</h2>
        <Card className="relative h-[600px] overflow-hidden shadow-ocean">
          <div ref={mapContainer} className="absolute inset-0" />

          {/* Basemap Control */}
          <div className="absolute top-4 left-4 z-10">
            <Card className="p-3 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">Basemap</span>
              </div>
              <RadioGroup value={currentBasemap} onValueChange={setCurrentBasemap}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satellite" id="satellite" />
                  <Label htmlFor="satellite" className="text-xs">Satellite</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="topographic" id="topographic" />
                  <Label htmlFor="topographic" className="text-xs">Topographic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="text-xs">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="text-xs">Light</Label>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="absolute top-4 right-4 z-10">
              <Card className="p-4 bg-card/95 backdrop-blur-sm min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Legend</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowLegend(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6]" />Moored Buoy - Active</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f59e0b]" />Maintenance</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#6b7280]" />Inactive</div>
                </div>
              </Card>
            </div>
          )}

          {/* Coordinates */}
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="px-3 py-1 bg-card/95 backdrop-blur-sm">
              <span className="text-xs font-mono">
                Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
              </span>
            </Card>
          </div>

          {!showLegend && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-card/95 backdrop-blur-sm"
              onClick={() => setShowLegend(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
};

export default OceanMapNew;
