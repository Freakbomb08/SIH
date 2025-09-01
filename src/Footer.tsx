import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Waves, 
  Github, 
  Twitter, 
  Mail, 
  Database, 
  Brain, 
  Globe,
  FileText
} from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { name: "Features", href: "#features" },//place links here
      { name: "Documentation", href: "#docs" },//place links here
      { name: "API Reference", href: "#api" },//place links here
      { name: "Pricing", href: "#pricing" },//place links here
    ],
    technology: [
      { name: "ARGO Data", href: "#argo" },//place links here
      { name: "AI Models", href: "#ai" },//place links here
      { name: "Visualization", href: "#viz" },//place links here
      { name: "Database", href: "#db" },//place links here
    ],
    resources: [
      { name: "Ocean Research", href: "#research" },
      { name: "Data Sources", href: "#sources" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Community", href: "#community" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const stats = [
    { icon: Database, label: "ARGO Floats", value: "15,000+" },
    { icon: Globe, label: "Ocean Coverage", value: "Global" },
    { icon: Brain, label: "AI Models", value: "4+" },
    { icon: FileText, label: "Data Formats", value: "NetCDF" },
  ];

  return (
    <footer className="bg-gradient-depth text-primary-foreground">
      {/* Stats Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">Float<span className="text-accent">Chat</span></span>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Democratizing access to oceanographic data through AI-powered conversational interfaces 
              and intelligent visualization tools.
            </p>
            
            <div className="flex gap-3">
              <a href="https://github.com/Freakbomb08/SIH"><Button size="icon" variant="outline" className="border-primary-foreground/30 bg-primary-foreground-transparent/0 text-primary-foreground hover:bg-foreground/30">
                <Github className="w-4 h-4" />
              </Button></a>
              <a href=""><Button size="icon" variant="outline" className="border-primary-foreground/30 bg-primary-foreground-transparent/0 text-primary-foreground hover:bg-foreground/30">
                <Twitter className="w-4 h-4" />
              </Button></a>
              <a href=""><Button size="icon" variant="outline" className="border-primary-foreground/30 bg-primary-foreground-transparent/0 text-primary-foreground hover:bg-foreground/30">
                <Mail className="w-4 h-4" />
              </Button></a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Product</h3>
            <div className="space-y-2">
              {links.product.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Technology</h3>
            <div className="space-y-2">
              {links.technology.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Resources</h3>
            <div className="space-y-2">
              {links.resources.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Company</h3>
            <div className="space-y-2">
              {links.company.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <p className="text-primary-foreground/80 text-sm">
                © 2025 FloatChat. All rights reserved.
              </p>
              <Badge className="bg-accent text-accent-foreground">
                Powered by ARGO
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <a href="#privacy" className="hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary-foreground transition-smooth">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;