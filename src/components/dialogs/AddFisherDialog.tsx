import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { storageService } from '@/lib/storageService';
import type { Fisher } from '@/lib/mockData';

interface AddFisherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFisherAdded: () => void;
}

const AddFisherDialog = ({ open, onOpenChange, onFisherAdded }: AddFisherDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    barangay: '',
    phone: '',
    email: '',
    boatType: '',
    licenseNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.barangay || !formData.phone || !formData.boatType || !formData.licenseNumber) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const newFisher: Fisher = {
      id: Date.now().toString(),
      name: formData.name,
      barangay: formData.barangay,
      phone: formData.phone,
      email: formData.email || undefined,
      boatType: formData.boatType,
      licenseNumber: formData.licenseNumber,
      registrationDate: new Date().toISOString(),
      status: 'active',
      totalCatches: 0,
      avgCatchPerTrip: 0,
    };

    storageService.addFisher(newFisher);
    
    toast({
      title: 'Success',
      description: 'Fisher registered successfully',
    });

    setFormData({
      name: '',
      barangay: '',
      phone: '',
      email: '',
      boatType: '',
      licenseNumber: '',
    });
    
    onFisherAdded();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Fisher</DialogTitle>
          <DialogDescription>
            Add a new fisher to the system
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barangay">Barangay *</Label>
            <Input
              id="barangay"
              value={formData.barangay}
              onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
              placeholder="Enter barangay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="boatType">Boat Type *</Label>
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
            <Label htmlFor="licenseNumber">License Number *</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              placeholder="Enter license number"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Register Fisher
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFisherDialog;
