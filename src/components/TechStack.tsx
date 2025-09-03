import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Brain, 
  BarChart3, 
  MessageSquare, 
  Cloud, 
  Zap,
  FileText,
  Globe
} from "lucide-react";

const TechStack = () => {
  const technologies = [
    {
      category: "Data Processing",
      icon: Database,
      color: "text-primary",
      bgColor: "bg-primary/10",
      techs: ["NetCDF", "PostgreSQL", "Parquet", "FAISS"]
    },
    {
      category: "AI & LLMs",
      icon: Brain,
      color: "text-accent",
      bgColor: "bg-accent/10",
      techs: ["GPT-4", "QWEN", "LLaMA", "RAG Pipeline"]
    },
    {
      category: "Visualization",
      icon: BarChart3,
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/10",
      techs: ["Plotly", "Leaflet", "Cesium"]
    },
    {
      category: "Interface",
      icon: MessageSquare,
      color: "text-secondary-foreground",
      bgColor: "bg-secondary/20",
      techs: ["React", "Tailwind","Typescript"]
    }
  ];

  const features = [
    {
      icon: FileText,
      title: "NetCDF Processing",
      description: "Automated ingestion and conversion of ARGO float data from NetCDF format to structured databases"
    },
    {
      icon: Cloud,
      title: "Vector Database",
      description: "FAISS/Chroma integration for metadata storage and similarity-based retrieval of ocean profiles"
    },
    {
      icon: Zap,
      title: "Real-time Queries",
      description: "Natural language to SQL translation powered by advanced language models and RAG pipelines"
    },
    {
      icon: Globe,
      title: "Geospatial Viz",
      description: "Interactive maps showing float trajectories, depth profiles, and comparative oceanographic data"
    }
  ];

  return (
    <section className="py-20 bg-gradient-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Advanced Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Powered by cutting-edge AI, database technologies, and visualization frameworks
          </p>
        </div>

        {/* Technology Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="p-6 text-center shadow-ocean transition-wave hover:shadow-glow">
              <div className={`w-16 h-16 ${tech.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <tech.icon className={`w-8 h-8 ${tech.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {tech.category}
              </h3>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {tech.techs.map((t, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 shadow-ocean">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Note */}
        <Card className="mt-12 p-8 bg-gradient-ocean text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready for Production Integration
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-3xl mx-auto">
            Connect to Supabase to unlock full AI functionality, database integration, 
            and real-time ocean data processing capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-accent text-accent-foreground text-sm px-4 py-2">
              Model Context Protocol (MCP) Ready
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground text-sm px-4 py-2 border border-primary-foreground/30">
              Extensible to BGC & Satellite Data
            </Badge>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TechStack;