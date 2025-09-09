import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { 
  Home, 
  Building2, 
  Users, 
  Settings, 
  Menu,
  Bell,
  Search,
  User,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigation = [
  { name: "Dashboard", href: "/crm", icon: Home },
  { name: "Proprietăți", href: "/crm/properties", icon: Building2 },
  { name: "Lead-uri", href: "/crm/leads", icon: Users },
  { name: "Setări", href: "/crm/settings", icon: Settings },
];

export function RealEstateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-card shadow-elegant transition-all duration-300",
        isMobile 
          ? sidebarOpen 
            ? "w-64" 
            : "-translate-x-full w-64"
          : sidebarOpen 
            ? "w-64" 
            : "w-16"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            {(sidebarOpen || !isMobile) && (
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                RealEstate Pro
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              {isMobile && sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:shadow-card group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-hover"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
                end
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110",
                  (sidebarOpen || isMobile) ? "mr-3" : "mx-auto"
                )} />
                {(sidebarOpen || isMobile) && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        isMobile 
          ? "ml-0" 
          : sidebarOpen 
            ? "ml-64" 
            : "ml-16"
      )}>
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-card">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Caută proprietăți, clienți..."
                  className="w-48 sm:w-64 pl-10 bg-background/50 border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}