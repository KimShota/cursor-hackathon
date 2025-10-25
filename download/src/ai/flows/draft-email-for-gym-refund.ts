'use server';

/**
 * @fileOverview A flow for drafting a polite email to Gym X requesting a refund.
 *
 * - draftEmailForGymRefund - A function that handles drafting the email.
 * - DraftEmailForGymRefundInput - The input type for the draftEmailForGymRefund function.
 * - DraftEmailForGymRefundOutput - The return type for the draftEmailForGymRefund function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftEmailForGymRefundInputSchema = z.object({
  userName: z.string().describe('The name of the user requesting the refund.'),
  gymName: z.string().describe('The name of the gym to request the refund from.'),
  reason: z.string().describe('The reason for requesting the refund.'),
});
export type DraftEmailForGymRefundInput = z.infer<typeof DraftEmailForGymRefundInputSchema>;

const DraftEmailForGymRefundOutputSchema = z.object({
  emailSubject: z.string().describe('The subject of the email.'),
  emailBody: z.string().describe('The body of the email.'),
});
export type DraftEmailForGymRefundOutput = z.infer<typeof DraftEmailForGymRefundOutputSchema>;

export async function draftEmailForGymRefund(input: DraftEmailForGymRefundInput): Promise<DraftEmailForGymRefundOutput> {
  return draftEmailForGymRefundFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftEmailForGymRefundPrompt',
  input: {schema: DraftEmailForGymRefundInputSchema},
  output: {schema: DraftEmailForGymRefundOutputSchema},
  prompt: `You are an AI assistant tasked with drafting a polite email to a gym requesting a refund.

  The user's name is: {{{userName}}}
  The gym's name is: {{{gymName}}}
  The reason for the refund request is: {{{reason}}}

  Please draft an email subject and body that are polite and professional, clearly stating the reason for the refund request and expressing gratitude for their time and consideration.

  The email should be concise and easy to understand. Focus on clarity and politeness.
  `,
});

const draftEmailForGymRefundFlow = ai.defineFlow(
  {
    name: 'draftEmailForGymRefundFlow',
    inputSchema: DraftEmailForGymRefundInputSchema,
    outputSchema: DraftEmailForGymRefundOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
