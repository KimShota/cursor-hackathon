'use server';

/**
 * @fileOverview A flow to provide medical information with a clear disclaimer, sourcing reputable sources,
 * and checking the user's medical profile for allergies and conditions.
 *
 * - medicalProfileDisclaimer - A function that handles the medical information request with disclaimer and medical profile check.
 * - MedicalProfileDisclaimerInput - The input type for the medicalProfileDisclaimer function.
 * - MedicalProfileDisclaimerOutput - The return type for the medicalProfileDisclaimer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalProfileDisclaimerInputSchema = z.object({
  query: z.string().describe('The medical information query from the user.'),
  medicalProfile: z
    .object({
      dob: z.string().nullable(),
      bloodType: z.string().nullable(),
      allergies: z.array(z.string()).nullable(),
      conditions: z.array(z.string()).nullable(),
      medications: z
        .array(
          z.object({
            name: z.string(),
            dose: z.string(),
            notes: z.string().optional(),
          })
        )
        .nullable(),
      emergencyContact: z
        .object({
          name: z.string(),
          phone: z.string(),
        })
        .nullable(),
    })
    .nullable()
    .describe('The medical profile of the user.'),
});
export type MedicalProfileDisclaimerInput = z.infer<
  typeof MedicalProfileDisclaimerInputSchema
>;

const MedicalProfileDisclaimerOutputSchema = z.object({
  replyText: z
    .string()
    .describe(
      'The response to the user query, including the medical information and the disclaimer.'
    ),
  sources: z
    .array(z.object({name: z.string(), url: z.string()}))
    .describe('The sources used to generate the medical information.'),
});
export type MedicalProfileDisclaimerOutput = z.infer<
  typeof MedicalProfileDisclaimerOutputSchema
>;

export async function medicalProfileDisclaimer(
  input: MedicalProfileDisclaimerInput
): Promise<MedicalProfileDisclaimerOutput> {
  return medicalProfileDisclaimerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalProfileDisclaimerPrompt',
  input: {schema: MedicalProfileDisclaimerInputSchema},
  output: {schema: MedicalProfileDisclaimerOutputSchema},
  prompt: `You are a medical assistant providing information to users. Always include the following disclaimer in your responses: "Medical information is informational only and not a substitute for professional medical advice. For urgent issues, contact emergency services. See sources: [links]."

  Take the user's medical profile into account when answering their query.  If the user has allergies or conditions that are relevant to the query, mention them in your response. If the query could affect a prescription or indicate a risk (e.g., says \"increase training from 5km to 20km per week\"), add \"Consult your doctor\" and block agentic execution unless user confirms and accepts liability.

  Query: {{{query}}}
  Medical Profile: {{{medicalProfile}}}

  Provide the replyText and the sources used to generate the information.
  `,
});

const medicalProfileDisclaimerFlow = ai.defineFlow(
  {
    name: 'medicalProfileDisclaimerFlow',
    inputSchema: MedicalProfileDisclaimerInputSchema,
    outputSchema: MedicalProfileDisclaimerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
