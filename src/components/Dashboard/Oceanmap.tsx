import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplet, Activity } from "lucide-react";

// Mock ARGO float data
const argoFloats = [
  { id: "2903769", lat: 14.8, lng: 67.2, temp: 28.5, salinity: 35.2, status: "active", lastUpdate: "2 days ago" },
  { id: "5906471", lat: 8.3, lng: 73.1, temp: 29.1, salinity: 34.8, status: "active", lastUpdate: "1 day ago" },
  { id: "2903454", lat: 22.1, lng: 64.5, temp: 26.8, salinity: 36.1, status: "active", lastUpdate: "3 hours ago" },
  { id: "5906389", lat: 16.7, lng: 59.8, temp: 27.9, salinity: 35.6, status: "maintenance", lastUpdate: "5 days ago" },
  { id: "2903887", lat: 12.4, lng: 78.9, temp: 28.8, salinity: 34.9, status: "active", lastUpdate: "4 hours ago" },
  { id: "5906203", lat: 19.2, lng: 71.3, temp: 27.2, salinity: 35.8, status: "active", lastUpdate: "1 day ago" },
];

export const Oceanmap = () => {
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent text-accent-foreground";
      case "maintenance": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-secondary/10 to-accent/5 border-accent/20 shadow-ocean">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-ocean text-primary-foreground">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">ARGO Float Locations</h3>
          <p className="text-sm text-muted-foreground">Arabian Sea & Indian Ocean</p>
        </div>
      </div>

      {/* Simplified Map Visualization */}
      <div className="relative h-96 bg-gradient-depth rounded-xl mb-4 overflow-hidden shadow-scientific">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/10"></div>
        
        {/* Ocean Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="text-accent-glow">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Float Markers */}
        {argoFloats.map((float) => (
          <div
            key={float.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-smooth hover:scale-110 ${
              selectedFloat === float.id ? 'scale-125 z-20' : 'z-10'
            }`}
            style={{
              left: `${((float.lng - 55) / 25) * 100}%`,
              top: `${(100 - ((float.lat - 5) / 20) * 100)}%`
            }}
            onClick={() => setSelectedFloat(selectedFloat === float.id ? null : float.id)}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-primary-foreground shadow-float ${
              float.status === 'active' 
                ? 'bg-accent animate-pulse' 
                : 'bg-destructive'
            }`}>
            </div>
            {selectedFloat === float.id && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-ocean border border-accent/20 min-w-48">
                <div className="text-sm font-medium text-foreground mb-2">Float {float.id}</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Thermometer className="w-3 h-3 text-accent" />
                    <span className="text-muted-foreground">Temp:</span>
                    <span className="text-foreground font-medium">{float.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Droplet className="w-3 h-3 text-primary" />
                    <span className="text-muted-foreground">Salinity:</span>
                    <span className="text-foreground font-medium">{float.salinity} PSU</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Activity className="w-3 h-3 text-accent-glow" />
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="text-foreground font-medium">{float.lastUpdate}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Coordinates */}
        <div className="absolute bottom-4 left-4 text-xs text-primary-foreground/80 bg-primary/20 backdrop-blur-sm rounded px-2 py-1">
          55°E - 80°E, 5°N - 25°N
        </div>
      </div>

      {/* Float Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card/50 rounded-lg p-4 border border-accent/20">
          <div className="text-2xl font-bold text-accent">{argoFloats.filter(f => f.status === 'active').length}</div>
          <div className="text-sm text-muted-foreground">Active Floats</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-accent/20">
          <div className="text-2xl font-bold text-primary">27.8°C</div>
          <div className="text-sm text-muted-foreground">Avg Temperature</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-accent/20">
          <div className="text-2xl font-bold text-accent-glow">35.4</div>
          <div className="text-sm text-muted-foreground">Avg Salinity (PSU)</div>
        </div>
      </div>
    </Card>
  );
};

export default Oceanmap;