import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Layers, X, Settings } from "lucide-react";

// ✅ Float Data
const argoFloats = [
  { id: "AD06", lat: 18.5, lon: 67.8, status: "active", type: "argo", lastProfile: "2024-01-15", temp: 28.5, salinity: 35.2 },
  { id: "BD12", lat: 18.1, lon: 88.7, status: "inactive", type: "buoy", lastProfile: "2024-01-10", temp: null, salinity: null },
  { id: "CA049", lat: 13.2, lon: 68.1, status: "maintenance", type: "argo", lastProfile: "2024-01-12", temp: null, salinity: null },
];

const getMarkerColor = (status: string, type: string) => {
  if (status === "inactive") return "#6b7280";
  if (status === "maintenance") return "#f59e0b";
  switch (type) {
    case "argo": return "#10b981";
    case "buoy": return "#3b82f6";
    case "omni": return "#8b5cf6";
    case "coastal": return "#f97316";
    default: return "#10b981";
  }
};

// ✅ NEW Leaflet Map (Default)
const LeafletMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [currentBasemap, setCurrentBasemap] = useState("light");
  const [showLegend, setShowLegend] = useState(true);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = L.map(mapContainer.current).setView([15, 80], 4);

    const basemaps: Record<string, string> = {
      satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      topographic: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      dark: "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png",
      light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };

    const layer = L.tileLayer(basemaps[currentBasemap], {
      attribution: "&copy; OpenStreetMap contributors",
    });
    layer.addTo(map.current);

    // Coordinates update
    map.current.on("mousemove", (e: any) => {
      setCoordinates({
        lat: parseFloat(e.latlng.lat.toFixed(4)),
        lng: parseFloat(e.latlng.lng.toFixed(4)),
      });
    });

    // Add floats
    argoFloats.forEach((float) => {
      const marker = L.circleMarker([float.lat, float.lon], {
        radius: 6,
        fillColor: getMarkerColor(float.status, float.type),
        color: "white",
        weight: 2,
        fillOpacity: 0.9,
      }).addTo(map.current!);

      marker.bindPopup(`
        <div>
          <b>${float.id}</b><br/>
          Status: ${float.status}<br/>
          Type: ${float.type}<br/>
          Last: ${float.lastProfile}<br/>
          ${float.temp ? `Temp: ${float.temp}°C` : ""}
          ${float.salinity ? `<br/>Salinity: ${float.salinity} PSU` : ""}
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
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10b981]" />ARGO</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6]" />Buoy</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />OMNI</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f97316]" />Coastal</div>
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

// 🔴 OLD MAPBOX VERSION (backup for you)
const OldMapboxMap = () => {
  return (
    <div className="old-mapbox-code p-6 border mt-10">
      //<h3 className="text-lg font-bold mb-2">⚠️ Old Mapbox Code Backup</h3>
      ///<p className="text-sm">Yeh pura Mapbox wala code yahin safe hai. Ab OSM Leaflet use ho raha hai by default.</p>
      {/* Tu chahe toh pura purana code yahan paste karke preserve kar sakta hai */}
   // </div>
  );
};

export default function OceanMap() {
  return (
    <>
      <LeafletMap />
      {/* <OldMapboxMap /> */}
    </>
  );
}
