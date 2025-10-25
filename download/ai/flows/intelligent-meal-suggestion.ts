'use server';

/**
 * @fileOverview A flow for providing intelligent meal suggestions based on user dietary restrictions, preferences, and calorie goals.
 *
 * - intelligentMealSuggestion - A function that orchestrates the meal suggestion process.
 * - IntelligentMealSuggestionInput - The input type for the intelligentMealSuggestion function.
 * - IntelligentMealSuggestionOutput - The return type for the intelligentMealSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMealSuggestionInputSchema = z.object({
  diningHall: z.string().describe('The name of the dining hall.'),
  date: z.string().describe('The date for which to retrieve the menu (YYYY-MM-DD).'),
  calorieGoal: z.number().describe('The desired calorie goal for the meal.'),
  dietaryRestrictions: z
    .array(z.string())
    .describe(
      'An array of dietary restrictions, such as vegetarian, vegan, gluten-free, dairy-free, nut-free, etc.'
    ),
  allergens: z
    .array(z.string())
    .describe('An array of allergens to avoid, such as dairy, nuts, soy, etc.'),
});
export type IntelligentMealSuggestionInput = z.infer<
  typeof IntelligentMealSuggestionInputSchema
>;

const IntelligentMealSuggestionOutputSchema = z.object({
  mealSuggestions: z.array(
    z.object({
      name: z.string().describe('The name of the meal.'),
      station: z.string().describe('The station where the meal is served.'),
      calories: z.number().nullable().describe('The number of calories in the meal.'),
      ingredients: z.array(z.string()).describe('The list of ingredients in the meal.'),
      tags: z
        .array(z.string())
        .describe(
          'Tags associated with the meal, such as vegan, vegetarian, dairy, contains-gluten, etc.'
        ),
      notes: z.string().nullable().describe('Additional notes about the meal.'),
    })
  ),
});
export type IntelligentMealSuggestionOutput = z.infer<
  typeof IntelligentMealSuggestionOutputSchema
>;

export async function intelligentMealSuggestion(
  input: IntelligentMealSuggestionInput
): Promise<IntelligentMealSuggestionOutput> {
  return intelligentMealSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentMealSuggestionPrompt',
  input: {schema: IntelligentMealSuggestionInputSchema},
  output: {schema: IntelligentMealSuggestionOutputSchema},
  prompt: `You are a helpful AI assistant designed to provide meal suggestions from a dining hall based on user dietary restrictions, preferences, and calorie goals.

You will receive the following information:
- Dining Hall: {{{diningHall}}}
- Date: {{{date}}}
- Calorie Goal: {{{calorieGoal}}}
- Dietary Restrictions: {{#each dietaryRestrictions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Allergens: {{#each allergens}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on this information, suggest meals from the dining hall menu that meet the user's criteria. The meal suggestions should include the name of the meal, the station where it is served, the number of calories, a list of ingredients, any relevant tags (e.g., vegan, vegetarian, dairy-free), and any additional notes.

Return the meal suggestions in the following JSON format:

{{json mealSuggestions=[{name: string, station: string, calories: number, ingredients: string[], tags: string[], notes: string}]}}`,
});

const intelligentMealSuggestionFlow = ai.defineFlow(
  {
    name: 'intelligentMealSuggestionFlow',
    inputSchema: IntelligentMealSuggestionInputSchema,
    outputSchema: IntelligentMealSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
