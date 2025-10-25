'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, UtensilsCrossed, Dumbbell, BookOpen } from "lucide-react";

export default function DemoSetupPage() {
    const { toast } = useToast();

    const handleSeed = (dataType: string) => {
        // In a real app, this would trigger a Firebase Function
        console.log(`Seeding ${dataType} mock data...`);
        toast({
            title: "Seeding Data",
            description: `Mock ${dataType} data has been successfully generated.`,
        });
    }

  return (
    <div className="container mx-auto max-w-2xl py-8">
        <Card>
            <CardHeader>
                <CardTitle>Hackathon Demo Setup</CardTitle>
                <CardDescription>Use these controls to seed mock data for your demo. These actions simulate backend processes.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => handleSeed('Dining Hall Menus')} size="lg" variant="outline" className="flex-col h-24">
                    <UtensilsCrossed className="h-6 w-6 mb-2" />
                    <span>Seed Dining Menus</span>
                </Button>
                <Button onClick={() => handleSeed('Device & Fitness Data')} size="lg" variant="outline" className="flex-col h-24">
                    <Dumbbell className="h-6 w-6 mb-2" />
                    <span>Seed Fitness Data</span>
                </Button>
                <Button onClick={() => handleSeed('Assignments')} size="lg" variant="outline" className="flex-col h-24">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span>Seed Assignments</span>
                </Button>
                 <Button onClick={() => handleSeed('All Data')} size="lg" className="flex-col h-24 md:col-span-2">
                    <Database className="h-6 w-6 mb-2" />
                    <span>Seed All Demo Data</span>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
