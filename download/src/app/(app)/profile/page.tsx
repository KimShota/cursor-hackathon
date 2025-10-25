'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User, Heart, Shield, Dumbbell } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  if (loading || !user) {
    return <div className="flex h-full w-full items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would collect form data and update Firestore
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User /> Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue={user.displayName || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <Input id="campus" defaultValue={user.campus || ''} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue={user.timezone || ''} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield /> Medical Profile</CardTitle>
              <CardDescription>This information is confidential and used for personalized AI suggestions.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue={user.medicalProfile?.dob || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input id="bloodType" defaultValue={user.medicalProfile?.bloodType || ''} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                <Input id="allergies" defaultValue={user.medicalProfile?.allergies?.join(', ') || ''} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="conditions">Conditions (comma-separated)</Label>
                <Input id="conditions" defaultValue={user.medicalProfile?.conditions?.join(', ') || ''} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Dumbbell /> Fitness Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" defaultValue={user.fitnessProfile?.height_cm || ''} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" defaultValue={user.fitnessProfile?.weight_kg || ''} />
                </div>
                 <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="activities">Typical Activities (comma-separated)</Label>
                    <Input id="activities" defaultValue={user.fitnessProfile?.typicalWeeklyActivities?.join(', ') || ''} />
                </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
