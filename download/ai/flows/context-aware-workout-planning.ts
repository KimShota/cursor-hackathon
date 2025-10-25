'use server';

/**
 * @fileOverview A context-aware workout planning AI agent.
 *
 * - contextAwareWorkoutPlanning - A function that handles the workout planning process.
 * - ContextAwareWorkoutPlanningInput - The input type for the contextAwareWorkoutPlanning function.
 * - ContextAwareWorkoutPlanningOutput - The return type for the contextAwareWorkoutPlanning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareWorkoutPlanningInputSchema = z.object({
  examSchedule: z.string().describe('The user’s exam schedule for the week.'),
  recentWorkoutIntensity: z
    .string()
    .describe('The intensity of the user’s recent workouts.'),
  recoveryNeeds: z.string().describe('The user’s recovery needs.'),
  fitnessGoals: z.string().describe('The user’s fitness goals.'),
});
export type ContextAwareWorkoutPlanningInput = z.infer<
  typeof ContextAwareWorkoutPlanningInputSchema
>;

const ContextAwareWorkoutPlanningOutputSchema = z.object({
  workoutPlan: z
    .string()
    .describe(
      'A personalized workout plan for the week, taking into account the user’s exam schedule, recent workout intensity, and recovery needs.'
    ),
});
export type ContextAwareWorkoutPlanningOutput = z.infer<
  typeof ContextAwareWorkoutPlanningOutputSchema
>;

export async function contextAwareWorkoutPlanning(
  input: ContextAwareWorkoutPlanningInput
): Promise<ContextAwareWorkoutPlanningOutput> {
  return contextAwareWorkoutPlanningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextAwareWorkoutPlanningPrompt',
  input: {schema: ContextAwareWorkoutPlanningInputSchema},
  output: {schema: ContextAwareWorkoutPlanningOutputSchema},
  prompt: `You are a personal fitness assistant. Generate a workout plan for the user for the next week,
considering their exam schedule, recent workout intensity, recovery needs, and fitness goals.

Exam Schedule: {{{examSchedule}}}
Recent Workout Intensity: {{{recentWorkoutIntensity}}}
Recovery Needs: {{{recoveryNeeds}}}
Fitness Goals: {{{fitnessGoals}}}

Workout Plan:`,
});

const contextAwareWorkoutPlanningFlow = ai.defineFlow(
  {
    name: 'contextAwareWorkoutPlanningFlow',
    inputSchema: ContextAwareWorkoutPlanningInputSchema,
    outputSchema: ContextAwareWorkoutPlanningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
