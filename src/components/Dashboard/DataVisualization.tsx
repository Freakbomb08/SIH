import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Waves } from "lucide-react";

// Mock oceanographic data
const temperatureProfile = [
  { depth: 0, temp: 28.5, salinity: 35.2 },
  { depth: 50, temp: 26.8, salinity: 35.4 },
  { depth: 100, temp: 24.2, salinity: 35.6 },
  { depth: 200, temp: 18.7, salinity: 35.9 },
  { depth: 500, temp: 12.3, salinity: 34.8 },
  { depth: 1000, temp: 6.8, salinity: 34.5 },
  { depth: 2000, temp: 3.2, salinity: 34.7 }
];

const bgcData = [
  { parameter: "Chlorophyll-a", value: 0.12, unit: "mg/m³", trend: "up" },
  { parameter: "Dissolved O₂", value: 215.4, unit: "μmol/kg", trend: "down" },
  { parameter: "Nitrate", value: 0.8, unit: "μmol/kg", trend: "stable" },
  { parameter: "pH", value: 8.05, unit: "", trend: "down" }
];

export const DataVisualization = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-accent" />;
      case "down": return <TrendingUp className="w-3 h-3 text-destructive rotate-180" />;
      default: return <BarChart3 className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Temperature/Salinity Profile */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-accent/20 shadow-scientific">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-ocean text-primary-foreground">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Ocean Profile</h3>
            <p className="text-sm text-muted-foreground">Temperature & Salinity vs Depth</p>
          </div>
        </div>

        <div className="relative h-80 bg-gradient-depth rounded-xl overflow-hidden">
          {/* Depth Scale */}
          <div className="absolute left-0 top-0 h-full w-12 bg-primary/5 border-r border-accent/20 flex flex-col justify-between py-4">
            {temperatureProfile.map((point, index) => (
              <div key={index} className="text-xs text-muted-foreground text-center">
                {point.depth}m
              </div>
            ))}
          </div>

          {/* Temperature Profile Line */}
          <div className="absolute left-12 right-16 top-0 h-full">
            <svg className="w-full h-full">
              <path
                d={`M ${temperatureProfile.map((point, index) => 
                  `${(point.temp / 30) * 100},${(index / (temperatureProfile.length - 1)) * 100}`
                ).join(' L ')}`}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                className="drop-shadow-sm"
                vectorEffect="non-scaling-stroke"
              />
              {temperatureProfile.map((point, index) => (
                <circle
                  key={index}
                  cx={`${(point.temp / 30) * 100}%`}
                  cy={`${(index / (temperatureProfile.length - 1)) * 100}%`}
                  r="4"
                  fill="hsl(var(--accent))"
                  className="drop-shadow-sm"
                />
              ))}
            </svg>
          </div>

          {/* Temperature Scale */}
          <div className="absolute right-0 top-0 h-full w-12 bg-primary/5 border-l border-accent/20 flex flex-col justify-between py-4">
            <div className="text-xs text-accent text-center font-medium">30°C</div>
            <div className="text-xs text-accent text-center font-medium">15°C</div>
            <div className="text-xs text-accent text-center font-medium">0°C</div>
          </div>

          {/* Profile Data Points */}
          <div className="absolute bottom-4 left-16 right-16 flex justify-between text-xs text-primary-foreground/80">
            <div className="bg-accent/20 backdrop-blur-sm rounded px-2 py-1">
              Surface: {temperatureProfile[0].temp}°C
            </div>
            <div className="bg-primary/20 backdrop-blur-sm rounded px-2 py-1">
              Deep: {temperatureProfile[temperatureProfile.length - 1].temp}°C
            </div>
          </div>
        </div>
      </Card>

      {/* BGC Parameters */}
      <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-accent/20 shadow-float">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-surface text-accent-foreground">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">BGC Parameters</h3>
            <p className="text-sm text-muted-foreground">Bio-Geochemical Measurements</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {bgcData.map((param, index) => (
            <div key={index} className="bg-card/70 rounded-lg p-4 border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{param.parameter}</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(param.trend)}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">{param.value}</span>
                <span className="text-sm text-muted-foreground">{param.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DataVisualization;