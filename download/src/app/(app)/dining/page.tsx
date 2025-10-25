'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDiningHalls } from '@/lib/mock-data';
import { Flame, Leaf, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

export default function DiningPage() {
  const [activeHall] = useState(mockDiningHalls[0]);

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UtensilsCrossed /> Dining Hall Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
              <TabsTrigger value="vegan">Vegan</TabsTrigger>
            </TabsList>
            
            {['all', 'vegetarian', 'vegan'].map(filter => (
                <TabsContent key={filter} value={filter}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {activeHall.meals
                            .filter(meal => filter === 'all' || meal.tags.includes(filter as 'vegetarian' | 'vegan'))
                            .map(meal => (
                            <Card key={meal.mealId} className="overflow-hidden">
                                <div className="relative h-40 w-full">
                                    <Image 
                                        src={`https://picsum.photos/seed/${meal.mealId}/400/300`}
                                        alt={meal.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint="food meal"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold">{meal.name}</h3>
                                    <p className="text-sm text-muted-foreground">{meal.station}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Flame className="h-4 w-4 text-orange-500" />
                                            <span>{meal.calories} kcal</span>
                                        </div>
                                        {meal.tags.includes('vegan') && <Badge variant="outline" className="text-green-600 border-green-600/50"><Leaf className="mr-1 h-3 w-3"/>Vegan</Badge>}
                                        {meal.tags.includes('vegetarian') && !meal.tags.includes('vegan') && <Badge variant="outline" className="text-emerald-600 border-emerald-600/50"><Leaf className="mr-1 h-3 w-3"/>Vegetarian</Badge>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
