import { GoogleGenAI } from "@google/genai";
import { TargetModel, Tone } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const elaboratePrompt = async (
  input: string,
  modelType: TargetModel,
  tone: Tone
): Promise<string> => {
  try {
    const prompt = `
    Target AI Model: ${modelType}
    Desired Tone: ${tone}
    User's Brief Input: "${input}"

    Task: Rewrite the user's brief input into a powerful, detailed prompt optimized for the Target AI Model. 
    Ensure the output is ready to be copy-pasted directly into the target AI.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creativity and structure
      },
    });

    return response.text || "Failed to generate prompt. Please try again.";
  } catch (error) {
    console.error("Error elaborating prompt:", error);
    throw new Error("Failed to connect to AI service.");
  }
};