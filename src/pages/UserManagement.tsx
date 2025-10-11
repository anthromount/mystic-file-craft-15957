import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Search,
  Download,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Activity,
  Fish,
} from 'lucide-react';
import { mockFishers, type Fisher, type SystemUser, systemUsers } from '@/lib/mockData';
import { storageService } from '@/lib/storageService';
import { exportToCSV } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import AddFisherDialog from '@/components/dialogs/AddFisherDialog';
import EditFisherDialog from '@/components/dialogs/EditFisherDialog';
import EditSystemUserDialog from '@/components/dialogs/EditSystemUserDialog';
import ManagePermissionsDialog from '@/components/dialogs/ManagePermissionsDialog';

const UserManagement = () => {
  const { toast } = useToast();
  const [fishers, setFishers] = useState(storageService.getFishers());
  const [users, setUsers] = useState(storageService.getSystemUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFisher, setSelectedFisher] = useState<Fisher | null>(null);
  const [editingFisher, setEditingFisher] = useState<Fisher | null>(null);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [managingPermissionsUser, setManagingPermissionsUser] = useState<SystemUser | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [isAddFisherOpen, setIsAddFisherOpen] = useState(false);

  // Initialize storage with mock data on first load
  useEffect(() => {
    storageService.initializeWithMockData(mockFishers, [], systemUsers);
    refreshData();
  }, []);

  const refreshData = () => {
    setFishers(storageService.getFishers());
    setUsers(storageService.getSystemUsers());
  };

  const handleExportFishers = () => {
    exportToCSV(fishers, 'fishers_data');
    toast({
      title: 'Success',
      description: 'Fisher data exported successfully',
    });
  };

  const handleToggleFisherStatus = (fisher: Fisher) => {
    const newStatus: Fisher['status'] = fisher.status === 'suspended' ? 'active' : 'suspended';
    const updatedFisher: Fisher = { ...fisher, status: newStatus };
    storageService.updateFisher(updatedFisher);
    refreshData();
    toast({
      title: 'Success',
      description: `Fisher ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully`,
    });
  };

  const handleDeactivateUser = (user: SystemUser) => {
    const newStatus: SystemUser['status'] = user.status === 'inactive' ? 'active' : 'inactive';
    const updatedUser: SystemUser = { ...user, status: newStatus };
    storageService.updateSystemUser(updatedUser);
    refreshData();
    toast({
      title: 'Success',
      description: `User ${newStatus === 'inactive' ? 'deactivated' : 'activated'} successfully`,
    });
  };

  // Filter users based on search and status
  const filteredFishers = fishers.filter(fisher => {
    const matchesSearch = fisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fisher.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fisher.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || fisher.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage fishers, researchers, and system users</p>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Fishers</p>
              <p className="text-2xl font-bold text-primary">{fishers.length}</p>
            </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Fishers</p>
              <p className="text-2xl font-bold text-success">
                {fishers.filter(f => f.status === 'active').length}
              </p>
            </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Suspended</p>
              <p className="text-2xl font-bold text-destructive">
                {fishers.filter(f => f.status === 'suspended').length}
              </p>
            </div>
              <UserX className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Users</p>
              <p className="text-2xl font-bold text-primary">{users.length}</p>
            </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fishers" className="space-y-6">
        <TabsList className="grid w-full lg:w-auto grid-cols-1 md:grid-cols-2 gap-2 h-auto">
          <TabsTrigger value="fishers" className="flex items-center space-x-2">
            <Fish className="h-4 w-4" />
            <span>Fishers</span>
          </TabsTrigger>
          <TabsTrigger value="system-users" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>System Users</span>
          </TabsTrigger>
        </TabsList>

        {/* Fishers Management */}
        <TabsContent value="fishers" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search fishers by name, barangay, or license..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'suspended' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('suspended')}
              >
                Suspended
              </Button>
            </div>
          </div>

          {/* Fishers Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registered Fishers ({filteredFishers.length})</CardTitle>
                <Button variant="outline" size="sm" onClick={handleExportFishers}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Fishers
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fisher</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFishers.map((fisher) => (
                    <TableRow key={fisher.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder-avatar-${fisher.id}.jpg`} />
                            <AvatarFallback>{getInitials(fisher.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{fisher.name}</div>
                            <div className="text-sm text-muted-foreground">{fisher.boatType}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {fisher.phone}
                          </div>
                          {fisher.email && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="h-3 w-3 mr-1" />
                              {fisher.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {fisher.barangay}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{fisher.licenseNumber}</div>
                          <div className="text-muted-foreground">
                            {new Date(fisher.registrationDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{fisher.totalCatches} catches</div>
                          <div className="text-sm text-muted-foreground">
                            {fisher.avgCatchPerTrip} kg avg
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={getStatusColor(fisher.status)}>
                          {fisher.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedFisher(fisher)}>
                              <Activity className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingFisher(fisher)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Fisher
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className={fisher.status === 'suspended' ? 'text-success' : 'text-destructive'}
                              onClick={() => handleToggleFisherStatus(fisher)}
                            >
                              {fisher.status === 'suspended' ? (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Suspend
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Users Management */}
        <TabsContent value="system-users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Users & Researchers</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEditingUser(user)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setManagingPermissionsUser(user)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className={user.status === 'inactive' ? 'text-success' : 'text-destructive'}
                              onClick={() => handleDeactivateUser(user)}
                            >
                              {user.status === 'inactive' ? (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fisher Details Dialog */}
      <Dialog open={!!selectedFisher} onOpenChange={() => setSelectedFisher(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fisher Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedFisher?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFisher && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Personal Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-sm text-foreground">{selectedFisher.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Barangay</label>
                      <p className="text-sm text-foreground">{selectedFisher.barangay}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-sm text-foreground">{selectedFisher.phone}</p>
                    </div>
                    {selectedFisher.email && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm text-foreground">{selectedFisher.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Fishing Details</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Boat Type</label>
                      <p className="text-sm text-foreground">{selectedFisher.boatType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">License Number</label>
                      <p className="text-sm text-foreground">{selectedFisher.licenseNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                      <p className="text-sm text-foreground">
                        {new Date(selectedFisher.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <Badge className={getStatusColor(selectedFisher.status)}>
                        {selectedFisher.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedFisher.totalCatches}</div>
                      <div className="text-sm text-muted-foreground">Total Catches</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-success">{selectedFisher.avgCatchPerTrip} kg</div>
                      <div className="text-sm text-muted-foreground">Average per Trip</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedFisher(null)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setEditingFisher(selectedFisher);
                  setSelectedFisher(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Fisher
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialogs */}
      <AddFisherDialog 
        open={isAddFisherOpen}
        onOpenChange={setIsAddFisherOpen}
        onFisherAdded={refreshData}
      />
      
      <EditFisherDialog
        fisher={editingFisher}
        open={!!editingFisher}
        onOpenChange={(open) => !open && setEditingFisher(null)}
        onFisherUpdated={refreshData}
      />

      <EditSystemUserDialog
        user={editingUser}
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
        onUserUpdated={refreshData}
      />

      <ManagePermissionsDialog
        user={managingPermissionsUser}
        open={!!managingPermissionsUser}
        onOpenChange={(open) => !open && setManagingPermissionsUser(null)}
        onPermissionsUpdated={refreshData}
      />
      </div>
    </>
  );
};

export default UserManagement;