'use server';

/**
 * @fileOverview Generates a markdown preview of an agentic action for user confirmation.
 *
 * - generateActionPreviewMarkdown - A function that generates the markdown preview.
 * - GenerateActionPreviewMarkdownInput - The input type for the generateActionPreviewMarkdown function.
 * - GenerateActionPreviewMarkdownOutput - The return type for the generateActionPreviewMarkdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionPreviewMarkdownInputSchema = z.object({
  actionType: z.string().describe('The type of agentic action (e.g., CREATE_CAL_EVENT, SEND_EMAIL, MATCH_BUDDY).'),
  payload: z.record(z.any()).describe('The payload containing the details of the action.'),
});
export type GenerateActionPreviewMarkdownInput = z.infer<typeof GenerateActionPreviewMarkdownInputSchema>;

const GenerateActionPreviewMarkdownOutputSchema = z.object({
  actionPreviewMarkdown: z.string().describe('A markdown preview of the action details.'),
});
export type GenerateActionPreviewMarkdownOutput = z.infer<typeof GenerateActionPreviewMarkdownOutputSchema>;

export async function generateActionPreviewMarkdown(input: GenerateActionPreviewMarkdownInput): Promise<GenerateActionPreviewMarkdownOutput> {
  return generateActionPreviewMarkdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionPreviewMarkdownPrompt',
  input: {schema: GenerateActionPreviewMarkdownInputSchema},
  output: {schema: GenerateActionPreviewMarkdownOutputSchema},
  prompt: `You are a helpful assistant that generates markdown previews of agentic actions.

  Given the action type and payload, create a concise and human-readable markdown summary of the action.

  Action Type: {{{actionType}}}
  Payload: {{{payload}}}

  Markdown Preview:`,
});

const generateActionPreviewMarkdownFlow = ai.defineFlow(
  {
    name: 'generateActionPreviewMarkdownFlow',
    inputSchema: GenerateActionPreviewMarkdownInputSchema,
    outputSchema: GenerateActionPreviewMarkdownOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
