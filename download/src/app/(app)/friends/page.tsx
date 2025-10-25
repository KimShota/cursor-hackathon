'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockFriends } from '@/lib/mock-data';
import { Check, Mail, UserPlus, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FriendsPage() {
    const { toast } = useToast();

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        toast({
            title: "Invite Sent!",
            description: `An invitation has been sent to ${email}.`
        });
        (e.target as HTMLFormElement).reset();
    }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Friend List</CardTitle>
                    <CardDescription>Manage your friends and their permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockFriends.map(friend => (
                            <div key={friend.uid} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={friend.avatarUrl} />
                                        <AvatarFallback>{friend.displayName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{friend.displayName}</p>
                                        <p className="text-sm text-muted-foreground">{friend.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {friend.permissions.shareAvailability && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground" title="Availability shared">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Available</span>
                                        </div>
                                    )}
                                    <Button variant="ghost" size="sm">Manage</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck /> Friend Verification</CardTitle>
                    <CardDescription>Vouch for friends to enable more collaborative features.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">This feature allows you to manually verify friends you know in real life, enabling deeper integrations like shared class schedules for planning.</p>
                     <Button className="mt-4" variant="outline">Vouch for a Friend</Button>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus /> Add a Friend</CardTitle>
                    <CardDescription>Invite friends to connect on HealthPal AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleInvite} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Friend's Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Send Invite</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
