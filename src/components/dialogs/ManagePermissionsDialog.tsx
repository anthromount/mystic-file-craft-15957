import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { storageService } from '@/lib/storageService';
import type { SystemUser } from '@/lib/mockData';

interface ManagePermissionsDialogProps {
  user: SystemUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPermissionsUpdated: () => void;
}

const availablePermissions = [
  { id: 'view_data', label: 'View Data' },
  { id: 'edit_data', label: 'Edit Data' },
  { id: 'delete_data', label: 'Delete Data' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'export_reports', label: 'Export Reports' },
  { id: 'system_settings', label: 'System Settings' },
];

const ManagePermissionsDialog = ({ user, open, onOpenChange, onPermissionsUpdated }: ManagePermissionsDialogProps) => {
  const { toast } = useToast();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setSelectedPermissions(user.permissions);
    }
  }, [user]);

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const updatedUser: SystemUser = {
      ...user,
      permissions: selectedPermissions,
    };

    storageService.updateSystemUser(updatedUser);
    
    toast({
      title: 'Success',
      description: 'Permissions updated successfully',
    });
    
    onPermissionsUpdated();
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Permissions</DialogTitle>
          <DialogDescription>
            Update permissions for {user.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {availablePermissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={permission.id}
                  checked={selectedPermissions.includes(permission.id)}
                  onCheckedChange={() => handleTogglePermission(permission.id)}
                />
                <Label
                  htmlFor={permission.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {permission.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Permissions
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManagePermissionsDialog;
