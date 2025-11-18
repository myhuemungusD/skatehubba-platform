import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AddSpotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: { lat: number; lng: number } | null;
  onSubmit: (spot: {
    name: string;
    address: string;
    type: string;
    difficulty: string;
    description: string;
    lat: number;
    lng: number;
  }) => void;
}

export function AddSpotDialog({ open, onOpenChange, location, onSubmit }: AddSpotDialogProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    onSubmit({
      name,
      address,
      type,
      difficulty,
      description,
      lat: location.lat,
      lng: location.lng,
    });

    // Reset form
    setName('');
    setAddress('');
    setType('');
    setDifficulty('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Skate Spot</DialogTitle>
          <DialogDescription>
            Share a new spot with the community. Make sure you're at the location!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Spot Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Downtown Rails"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 123 Main St"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rails">Rails</SelectItem>
                  <SelectItem value="Stairs">Stairs</SelectItem>
                  <SelectItem value="Park">Park</SelectItem>
                  <SelectItem value="Street">Street</SelectItem>
                  <SelectItem value="Ledges">Ledges</SelectItem>
                  <SelectItem value="Gap">Gap</SelectItem>
                  <SelectItem value="Manual Pad">Manual Pad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty} required>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the spot, obstacles, and any tips..."
              rows={3}
              required
            />
          </div>

          {location && (
            <div className="text-sm text-muted-foreground">
              Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!location}>
              Add Spot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
