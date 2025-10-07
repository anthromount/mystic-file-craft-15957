import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { storageService } from '@/lib/storageService';
import type { Fisher } from '@/lib/mockData';

interface EditFisherDialogProps {
  fisher: Fisher | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFisherUpdated: () => void;
}

const EditFisherDialog = ({ fisher, open, onOpenChange, onFisherUpdated }: EditFisherDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    barangay: '',
    phone: '',
    email: '',
    boatType: '',
    licenseNumber: '',
    status: 'active' as Fisher['status'],
  });

  useEffect(() => {
    if (fisher) {
      setFormData({
        name: fisher.name,
        barangay: fisher.barangay,
        phone: fisher.phone,
        email: fisher.email || '',
        boatType: fisher.boatType,
        licenseNumber: fisher.licenseNumber,
        status: fisher.status,
      });
    }
  }, [fisher]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fisher) return;

    if (!formData.name || !formData.barangay || !formData.phone || !formData.boatType || !formData.licenseNumber) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const updatedFisher: Fisher = {
      ...fisher,
      name: formData.name,
      barangay: formData.barangay,
      phone: formData.phone,
      email: formData.email || undefined,
      boatType: formData.boatType,
      licenseNumber: formData.licenseNumber,
      status: formData.status,
    };

    storageService.updateFisher(updatedFisher);
    
    toast({
      title: 'Success',
      description: 'Fisher updated successfully',
    });
    
    onFisherUpdated();
    onOpenChange(false);
  };

  if (!fisher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Fisher</DialogTitle>
          <DialogDescription>
            Update fisher information
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-barangay">Barangay *</Label>
            <Input
              id="edit-barangay"
              value={formData.barangay}
              onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
              placeholder="Enter barangay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone Number *</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-boatType">Boat Type *</Label>
            <Select value={formData.boatType} onValueChange={(value) => setFormData({ ...formData, boatType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select boat type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Motorized">Motorized</SelectItem>
                <SelectItem value="Non-motorized">Non-motorized</SelectItem>
                <SelectItem value="Paddle">Paddle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-licenseNumber">License Number *</Label>
            <Input
              id="edit-licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              placeholder="Enter license number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status *</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Fisher['status'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Fisher
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFisherDialog;
