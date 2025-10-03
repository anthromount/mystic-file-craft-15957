import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
  type: 'gis' | 'analytics';
}

export function FilterDialog({ open, onOpenChange, onApplyFilters, type }: FilterDialogProps) {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    location: '',
    status: '',
    species: '',
    minCatch: '',
    maxCatch: ''
  });

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      location: '',
      status: '',
      species: '',
      minCatch: '',
      maxCatch: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Data</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down the displayed data
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>

          {/* Location Filter */}
          {type === 'gis' && (
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="balite">Balite Bay</SelectItem>
                  <SelectItem value="sanmiguel">San Miguel Coast</SelectItem>
                  <SelectItem value="carangay">Carangay Waters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status Filter */}
          {type === 'gis' && (
            <div>
              <Label htmlFor="status">Zone Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="optimal">Optimal</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Catch Range */}
          {type === 'analytics' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minCatch">Min Catch (kg)</Label>
                <Input
                  id="minCatch"
                  type="number"
                  placeholder="0"
                  value={filters.minCatch}
                  onChange={(e) => setFilters({ ...filters, minCatch: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="maxCatch">Max Catch (kg)</Label>
                <Input
                  id="maxCatch"
                  type="number"
                  placeholder="100"
                  value={filters.maxCatch}
                  onChange={(e) => setFilters({ ...filters, maxCatch: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
