// use server'
'use server';
/**
 * @fileOverview Suggests relevant Farcaster channels for sharing game scores.
 *
 * - suggestChannels - A function that suggests Farcaster channels based on the game and score.
 * - SuggestChannelsInput - The input type for the suggestChannels function.
 * - SuggestChannelsOutput - The return type for the suggestChannels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestChannelsInputSchema = z.object({
  gameName: z.string().describe('The name of the game played.'),
  score: z.number().describe('The score achieved in the game.'),
});
export type SuggestChannelsInput = z.infer<typeof SuggestChannelsInputSchema>;

const SuggestChannelsOutputSchema = z.object({
  channels: z.array(
    z.string().describe('A suggested Farcaster channel to share the score to.')
  ).describe('A list of suggested Farcaster channels.')
});
export type SuggestChannelsOutput = z.infer<typeof SuggestChannelsOutputSchema>;

export async function suggestChannels(input: SuggestChannelsInput): Promise<SuggestChannelsOutput> {
  return suggestChannelsFlow(input);
}

const suggestChannelsPrompt = ai.definePrompt({
  name: 'suggestChannelsPrompt',
  input: {schema: SuggestChannelsInputSchema},
  output: {schema: SuggestChannelsOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting relevant Farcaster channels for users to share their game scores.

  Given the game name and the score achieved, suggest a list of Farcaster channels where the user might want to share their achievement.
  Consider channels related to the game itself, high scores, or general gaming communities.

  Game Name: {{{gameName}}}
  Score: {{{score}}}

  Suggest Farcaster channels to share to:
  `,
});

const suggestChannelsFlow = ai.defineFlow(
  {
    name: 'suggestChannelsFlow',
    inputSchema: SuggestChannelsInputSchema,
    outputSchema: SuggestChannelsOutputSchema,
  },
  async input => {
    const {output} = await suggestChannelsPrompt(input);
    return output!;
  }
);
