'use client';

import { Meal } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Leaf, Wheat, MilkOff } from 'lucide-react';
import Image from 'next/image';

interface MealSuggestionCardProps {
  suggestions: Meal[];
}

const tagIcons = {
    vegan: <Leaf className="h-3 w-3" />,
    vegetarian: <Leaf className="h-3 w-3" />,
    'contains-gluten': <Wheat className="h-3 w-3" />,
    dairy: <MilkOff className="h-3 w-3" />
}

export function MealSuggestionCard({ suggestions }: MealSuggestionCardProps) {
  if (!suggestions || suggestions.length === 0) {
    return <p>No meal suggestions found that match your criteria.</p>;
  }

  return (
    <div className="grid gap-4">
      {suggestions.map((meal) => (
        <Card key={meal.mealId} className="overflow-hidden">
          <div className="flex">
            <div className="relative w-24 h-24 flex-shrink-0">
               <Image 
                src={`https://picsum.photos/seed/${meal.mealId}/200/200`}
                alt={meal.name}
                fill
                className="object-cover"
                data-ai-hint="food meal"
                />
            </div>
            <div className="p-3 flex-grow">
              <h4 className="font-semibold text-sm">{meal.name}</h4>
              <p className="text-xs text-muted-foreground">{meal.station}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span>{meal.calories} kcal</span>
                </div>
                <div className="flex flex-wrap gap-1">
                    {meal.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1 capitalize pl-1.5 pr-2 py-0.5 text-xs">
                             {tagIcons[tag as keyof typeof tagIcons]}
                            {tag.replace('contains-','')}
                        </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
