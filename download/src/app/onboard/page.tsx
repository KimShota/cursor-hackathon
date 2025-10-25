'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, University, Clock, ShieldCheck, UserCheck, PartyPopper } from 'lucide-react';

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
];

const campuses = ['UofX', 'UofY', 'State University', 'Tech Institute'];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [timezone, setTimezone] = useState('');
  const [campus, setCampus] = useState('');
  const [medicalConsent, setMedicalConsent] = useState(false);
  const [mockData, setMockData] = useState(true);
  
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  
  const finishOnboarding = () => {
    console.log('Onboarding finished:', { timezone, campus, medicalConsent, mockData });
    // Here you would save the data to the user's profile in Firestore
    nextStep();
    setTimeout(() => {
        router.push('/chat');
    }, 2000);
  };

  if (loading || !user) {
    return <div className="flex h-screen w-full items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
       <div className="absolute top-4 left-4 flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">HealthPal AI</span>
        </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          {step === 1 && <CardTitle>Welcome, {user.displayName}!</CardTitle>}
          {step === 2 && <CardTitle>Privacy & Consent</CardTitle>}
          {step === 3 && <CardTitle>Demo Setup</CardTitle>}
          {step < 4 && <CardDescription>Let's get your profile set up in a few quick steps.</CardDescription>}
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Timezone</Label>
                 <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={setTimezone} value={timezone}>
                        <SelectTrigger><SelectValue placeholder="Select your timezone" /></SelectTrigger>
                        <SelectContent>
                            {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Your Campus</Label>
                 <div className="flex items-center gap-2">
                    <University className="h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={setCampus} value={campus}>
                        <SelectTrigger><SelectValue placeholder="Select your campus" /></SelectTrigger>
                        <SelectContent>
                            {campuses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
                <div className="flex items-start space-x-4 rounded-md border p-4 bg-blue-50/50 dark:bg-blue-900/10">
                    <ShieldCheck className="mt-px h-5 w-5 text-primary" />
                    <div className="space-y-1">
                        <p className="font-medium">Medical Profile Storage</p>
                        <p className="text-sm text-muted-foreground">To provide personalized health advice, HealthPal AI needs to store sensitive medical information. This data is encrypted and will never be shared without your explicit consent.</p>
                    </div>
                </div>
                 <div className="items-top flex space-x-2">
                    <Checkbox id="medical-consent" checked={medicalConsent} onCheckedChange={(checked) => setMedicalConsent(Boolean(checked))} />
                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="medical-consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I consent to securely storing my medical profile information.
                        </label>
                        <p className="text-sm text-muted-foreground">
                        You can revoke this consent at any time in your settings.
                        </p>
                    </div>
                </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
                <div className="flex items-start space-x-4 rounded-md border p-4 bg-green-50/50 dark:bg-green-900/10">
                    <UserCheck className="mt-px h-5 w-5 text-green-600" />
                    <div className="space-y-1">
                        <p className="font-medium">Hackathon Demo Mode</p>
                        <p className="text-sm text-muted-foreground">For this demo, we can populate your account with mock data for fitness, dining halls, and friends to showcase all features without connecting real accounts.</p>
                    </div>
                </div>
                 <div className="items-top flex space-x-2">
                    <Checkbox id="mock-data" checked={mockData} onCheckedChange={(checked) => setMockData(Boolean(checked))} />
                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="mock-data" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Enable mock data for the demo.
                        </label>
                        <p className="text-sm text-muted-foreground">
                        We recommend keeping this enabled for the best demo experience.
                        </p>
                    </div>
                </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-8">
                <PartyPopper className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-2xl font-bold">You're all set!</h3>
                <p className="mt-2 text-muted-foreground">Redirecting you to the app...</p>
            </div>
          )}
        </CardContent>
        {step < 4 && (
            <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                Back
            </Button>
            {step < totalSteps ? (
                <Button onClick={nextStep} disabled={(step === 2 && !medicalConsent) || (step === 1 && (!timezone || !campus))}>Next</Button>
            ) : (
                <Button onClick={finishOnboarding}>Finish</Button>
            )}
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
