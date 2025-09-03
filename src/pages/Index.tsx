import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import OceanMap from "@/components/OceanMap";
import { DataVisualization } from "./DataVisualization";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <div id="chat">
          <ChatInterface />
        </div>
        <div id="map">
          <OceanMap />
        </div>
        <div id="tech">
          <TechStack />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
