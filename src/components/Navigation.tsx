import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Waves, Database, MessageSquare, Map, Cpu, LayoutDashboard } from "lucide-react";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }, // internal route
    { name: "Chat", icon: MessageSquare, href: "#chat" },           // page anchor
    { name: "Map", icon: Map, href: "#map" },                      // page anchor
    { name: "Technology", icon: Cpu, href: "#tech" },              // page anchor
    { name: "Data", icon: Database, href: "#data" },               // page anchor
  ];

  const renderNavLink = (item: { name: string; icon: any; href: string }) => {
    const Icon = item.icon;
    // internal react-router route (starts with /)
    if (item.href.startsWith("/")) {
      return (
        <Link
          key={item.name}
          to={item.href}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
          onClick={() => setIsOpen(false)} // close mobile menu on click
        >
          <Icon className="w-4 h-4" />
          <span>{item.name}</span>
        </Link>
      );
    }
    // anchor on same page (#something)
    if (item.href.startsWith("#")) {
      return (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
          onClick={() => setIsOpen(false)}
        >
          <Icon className="w-4 h-4" />
          <span>{item.name}</span>
        </a>
      );
    }

    // external link (http/https)
    return (
      <a
        key={item.name}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
      >
        <Icon className="w-4 h-4" />
        <span>{item.name}</span>
      </a>
    );
  };

  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-ocean">
              <Waves className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FloatChat</h1>
              <span className="text-xs text-muted-foreground">Beta</span>
            </div>
          </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => renderNavLink(item))}
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden bg-surface/80 border-t">
          <div className="flex flex-col p-4 gap-3">
            {navItems.map((item) => renderNavLink(item))}
            <div>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
