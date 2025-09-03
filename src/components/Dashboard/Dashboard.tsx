import { useState } from "react";
import { Oceanmap } from "./Oceanmap";
import { DataVisualization } from "./DataVisualization";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, BarChart3, Waves } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const views = [
    { id: "overview", label: "Overview", icon: Waves },
    { id: "map", label: "Ocean Map", icon: MapPin },
    { id: "profiles", label: "Data Profiles", icon: BarChart3 },
  ];
  const renderActiveView = () => {
    switch (activeView) {
      case "map":
        return <Oceanmap />;
      case "profiles":
        return (
          <div className="space-y-6">
            <DataVisualization />
          </div>
        );
      case "overview":
      default:
        return (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-ocean text-primary-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-bold">Active Floats</h3>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-sm opacity-90">Worldwide deployment</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-surface text-accent-foreground">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-bold">Profiles Collected</h3>
                    <p className="text-2xl font-bold">156,892</p>
                    <p className="text-sm opacity-90">This month</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-depth text-primary-foreground">
                <div className="flex items-center gap-3">
                  <Waves className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-bold">Coverage Area</h3>
                    <p className="text-2xl font-bold">89.2%</p>
                    <p className="text-sm opacity-90">Global oceans</p>
                  </div>
                </div>
              </Card>
            </div>
            {/* Combined View */}
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 mx-20 my-10">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Real-time Ocean Map</h2>
                <div className="h-[700px]">
                  <Oceanmap />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Current Data Profiles</h2>
                <div className="h-[1000px] overflow-y-auto space-y-4">
                  <DataVisualization />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div className="space-y-6 mx-20 my-0">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ocean Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time monitoring and analysis of ARGO float oceanographic data
              </p>
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <Button
                    key={view.id}
                    variant={activeView === view.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView(view.id)}
                    className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {view.label}
                  </Button>
                );
              })}
            </div>
          </div>
          {/* Dashboard Content */}
          <div className="min-h-[600px]">
            {renderActiveView()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Dashboard;
