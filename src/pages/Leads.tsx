import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  MoreHorizontal,
  Edit,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AddLeadDialog } from "@/components/AddLeadDialog";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";

const leads = [
  {
    id: 1,
    name: "Maria Popescu",
    email: "maria.popescu@email.com",
    phone: "+40 722 123 456",
    location: "București, Sector 1",
    interest: "Apartament 2-3 camere",
    budget: "€80,000 - €120,000",
    status: "Hot",
    priority: "high",
    source: "Website",
    lastContact: "Azi, 14:30",
    notes: "Interesată de zone centrale, preferă apartamente noi.",
    rating: 5,
    agentId: "user1", // Mock agent ID
  },
  {
    id: 2,
    name: "Alexandru Dumitrescu",
    email: "alex.dumitrescu@email.com",
    phone: "+40 733 987 654",
    location: "București, Sector 2",
    interest: "Casă cu grădină",
    budget: "€200,000 - €300,000",
    status: "Warm",
    priority: "medium",
    source: "Facebook",
    lastContact: "Ieri, 16:45",
    notes: "Familie cu 2 copii, caută casă în zonă liniștită.",
    rating: 4,
    agentId: "user2",
  },
  {
    id: 3,
    name: "Elena Stoica",
    email: "elena.stoica@email.com",
    phone: "+40 744 555 333",
    location: "București, Sector 3",
    interest: "Apartament în centru",
    budget: "€150,000 - €250,000",
    status: "Cold",
    priority: "low",
    source: "Google Ads",
    lastContact: "2 zile în urmă",
    notes: "Investitor, caută proprietăți pentru închiriere.",
    rating: 3,
    agentId: "user1",
  },
  {
    id: 4,
    name: "Andrei Ionescu",
    email: "andrei.ionescu@email.com",
    phone: "+40 755 777 888",
    location: "București, Sector 4",
    interest: "Studio pentru închiriere",
    budget: "€50,000 - €80,000",
    status: "New",
    priority: "medium",
    source: "Recomandare",
    lastContact: "Azi, 09:15",
    notes: "Tânăr profesionist, primul apartament.",
    rating: 4,
    agentId: "user2",
  },
  {
    id: 5,
    name: "Carmen Vasile",
    email: "carmen.vasile@email.com",
    phone: "+40 766 444 222",
    location: "București, Sector 5",
    interest: "Penthouse de lux",
    budget: "€400,000+",
    status: "Hot",
    priority: "high",
    source: "Website",
    lastContact: "Azi, 11:20",
    notes: "CEO, caută proprietăți premium cu vedere.",
    rating: 5,
    agentId: "user1",
  },
  {
    id: 6,
    name: "Mihai Radu",
    email: "mihai.radu@email.com",
    phone: "+40 777 666 555",
    location: "București, Sector 6",
    interest: "Apartament familial",
    budget: "€120,000 - €180,000",
    status: "Warm",
    priority: "medium",
    source: "Instagram",
    lastContact: "Acum 3 ore",
    notes: "Familie tânără, caută primul apartament.",
    rating: 4,
    agentId: "user2",
  },
];

const statusStats = [
  { status: "New", count: 8, color: "bg-info" },
  { status: "Hot", count: 12, color: "bg-destructive" },
  { status: "Warm", count: 24, color: "bg-warning" },
  { status: "Cold", count: 16, color: "bg-muted" },
];

export default function Leads() {
  const { toast } = useToast();
  const permissions = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [leadsList, setLeadsList] = useState(leads);

  const filteredLeads = leadsList.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.interest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-info text-white";
      case "Hot": return "bg-destructive text-destructive-foreground";
      case "Warm": return "bg-warning text-warning-foreground";
      case "Cold": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "fill-warning text-warning" : "text-muted-foreground"}`}
      />
    ));
  };

  const canEditLead = (lead: any) => {
    return permissions.canEditAny || (permissions.canEditOwn && lead.agentId === permissions.userId);
  };

  const canDeleteLead = (lead: any) => {
    return permissions.canDeleteAny || (permissions.canDeleteOwn && lead.agentId === permissions.userId);
  };

  const handleDeleteLead = (leadId: number) => {
    setLeadsList(prev => prev.filter(l => l.id !== leadId));
    toast({
      title: "Lead șters",
      description: "Lead-ul a fost șters cu succes.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Lead-uri
          </h1>
          <p className="text-muted-foreground">
            Gestionează și urmărește clienții potențiali.
          </p>
        </div>
        <AddLeadDialog 
          onLeadAdded={(newLead) => {
            setLeadsList(prev => [...prev, newLead]);
          }}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {statusStats.map((stat, index) => (
          <Card key={stat.status} className="shadow-card animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.status}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Caută după nume, email sau interes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Prioritate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate prioritățile</SelectItem>
                <SelectItem value="high">Înaltă</SelectItem>
                <SelectItem value="medium">Medie</SelectItem>
                <SelectItem value="low">Scăzută</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtre Avansate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredLeads.map((lead, index) => (
          <Card key={lead.id} className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    {renderStars(lead.rating)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      title="Vezi detalii"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {canEditLead(lead) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-info hover:bg-info/10"
                        title="Editează lead-ul"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {canDeleteLead(lead) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Șterge lead-ul"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border border-border shadow-hover">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-foreground">Șterge lead-ul</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Ești sigur că vrei să ștergi acest lead? Această acțiune nu poate fi anulată.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-background border-border text-foreground hover:bg-muted">
                              Anulează
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteLead(lead.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card"
                            >
                              Șterge
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-3 w-3 mr-2" />
                  {lead.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-2" />
                  {lead.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-2" />
                  {lead.location}
                </div>
              </div>

              {/* Interest & Budget */}
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Interes: </span>
                  <span className="text-sm text-muted-foreground">{lead.interest}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Buget: </span>
                  <span className="text-sm text-primary font-medium">{lead.budget}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Sursă: </span>
                  <span className="text-sm text-muted-foreground">{lead.source}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {lead.notes}
                </p>
              </div>

              {/* Actions & Last Contact */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {lead.lastContact}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nu au fost găsite lead-uri
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Încearcă să modifici filtrele sau să adaugi un lead nou.
            </p>
            <AddLeadDialog 
              onLeadAdded={(newLead) => {
                setLeadsList(prev => [...prev, newLead]);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}