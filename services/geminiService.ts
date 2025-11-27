
import { GoogleGenAI } from "@google/genai";
import { CampaignObjective, CampaignPlatform } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will not throw in the target environment where process.env.API_KEY is set.
  // It's a safeguard for local development if the key is missing.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestInterests = async (objective: CampaignObjective, platform: CampaignPlatform, campaignName: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `
        You are a marketing expert. I am creating an ad campaign with the following details:
        - Campaign Name: "${campaignName}"
        - Objective: "${objective}"
        - Platform: "${platform}"

        Based on these details, suggest 5-7 highly relevant target audience interests. 
        Your response must be a single line of comma-separated values.
        For example: "Digital Marketing, SEO, Content Creation, Social Media Advertising, Tech Startups"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
              systemInstruction: "You are a helpful marketing assistant that provides concise, comma-separated lists.",
            }
        });

        const text = response.text?.trim();

        if (!text) {
            throw new Error("Received an empty response from Gemini API.");
        }
        
        // Clean up the response to ensure it's just a comma-separated list
        return text.replace(/[\n*]/g, '').replace(/\s*,\s*/g, ', ').trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback or re-throw
        return "Digital Marketing, Social Media, Online Advertising";
    }
};
