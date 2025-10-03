import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Waves, MapPin, BarChart3, Users, Database, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', path: '/', icon: BarChart3 },
  { name: 'GIS Mapping', path: '/gis-mapping', icon: MapPin },
  { name: 'Fisherfolk', path: '/user-management', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Data Collection', path: '/data-collection', icon: Database },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [researchMode, setResearchMode] = useState(() => {
    const saved = localStorage.getItem('researchMode');
    return saved === 'true';
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('researchMode', researchMode.toString());
  }, [researchMode]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ocean text-primary-foreground">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">FishDSS</h1>
              <p className="text-xs text-muted-foreground">Virac, Catanduanes</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "flex items-center space-x-2 transition-smooth",
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* User Profile & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button 
              variant={researchMode ? "default" : "outline"}
              size="sm" 
              className="hidden sm:flex"
              onClick={() => setResearchMode(!researchMode)}
            >
              <FlaskConical className="h-4 w-4" />
              <span>Research Mode</span>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "justify-start space-x-2",
                      isActive && "text-primary bg-primary/10"
                    )}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}