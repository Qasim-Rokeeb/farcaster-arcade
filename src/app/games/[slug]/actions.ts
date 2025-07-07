'use server';

import { suggestChannels, SuggestChannelsOutput } from '@/ai/flows/suggest-channels';

export async function getSuggestedChannels(
  gameName: string,
  score: number
): Promise<SuggestChannelsOutput> {
  try {
    const response = await suggestChannels({ gameName, score });
    return response;
  } catch (error) {
    console.error('Error in suggestChannels flow:', error);
    // In a real app, you might want to return a more specific error or an empty array
    return { channels: [] };
  }
}
