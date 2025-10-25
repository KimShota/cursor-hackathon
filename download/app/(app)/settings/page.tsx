import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Bell, Key, Shield, Wifi, Share2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Share2 /> Integrations & API Keys</CardTitle>
          <CardDescription>Connect services and manage developer API keys. These are placeholders for the demo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500">G</div>
                <div>
                    <h3 className="font-semibold">Google Calendar</h3>
                    <p className="text-sm text-muted-foreground">Sync your events and availability.</p>
                </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openai-key" className="flex items-center gap-2"><Key className="h-4 w-4" />OPENAI_API_KEY</Label>
            <Input id="openai-key" type="password" placeholder="••••••••••••••••••••••••" disabled />
          </div>
           <div className="space-y-2">
            <Label htmlFor="sendgrid-key" className="flex items-center gap-2"><Key className="h-4 w-4" />SENDGRID_API_KEY</Label>
            <Input id="sendgrid-key" type="password" placeholder="••••••••••••••••••••••••" disabled />
          </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch id="push-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield /> Privacy</CardTitle>
          <CardDescription>Control your data and privacy settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Download My Data</Button>
          <Button variant="destructive">Delete My Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
