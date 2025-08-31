import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/ocean-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ocean Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-ocean opacity-80" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 bg-primary-glow rounded-full animate-ripple" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-accent rounded-full animate-ripple" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-5 h-5 bg-secondary rounded-full animate-ripple" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-wave">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground mb-6 leading-tight">
            Float<span className="text-accent">Chat</span>
          </h1>
          <div className="w-32 h-1 bg-accent mx-auto mb-8 animate-wave" />
        </div>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization
        </p>
        
        <p className="text-lg text-primary-foreground/80 mb-12 max-w-4xl mx-auto">
          Democratizing access to oceanographic data through natural language queries, 
          interactive visualizations, and intelligent data discovery.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow transition-wave text-lg px-8 py-4"
          >
            Start Exploring Ocean Data
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-wave text-lg px-8 py-4"
          >
            View Documentation
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 p-6 text-center shadow-ocean">
            <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
            <div className="text-sm text-muted-foreground">Active ARGO Floats</div>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 p-6 text-center shadow-ocean">
            <div className="text-3xl font-bold text-accent mb-2">2M+</div>
            <div className="text-sm text-muted-foreground">Ocean Profiles</div>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 p-6 text-center shadow-ocean">
            <div className="text-3xl font-bold text-primary-glow mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;