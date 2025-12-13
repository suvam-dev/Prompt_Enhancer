import { TargetModel, Tone } from './types';

export const MODEL_OPTIONS = [
  { value: TargetModel.GEMINI_GENERAL, label: 'Gemini (General Assistant)' },
  { value: TargetModel.GEMINI_CODING, label: 'Gemini (Coding Expert)' },
  { value: TargetModel.MIDJOURNEY, label: 'Midjourney (Image Gen)' },
  { value: TargetModel.STABLE_DIFFUSION, label: 'Stable Diffusion (Image Gen)' },
  { value: TargetModel.DALLE, label: 'DALL-E 3 (Image Gen)' },
  { value: TargetModel.WRITING_ASSISTANT, label: 'Creative Writing Assistant' },
];

export const TONE_OPTIONS = [
  { value: Tone.PROFESSIONAL, label: 'Professional' },
  { value: Tone.CREATIVE, label: 'Creative' },
  { value: Tone.CONCISE, label: 'Concise' },
  { value: Tone.ACADEMIC, label: 'Academic' },
  { value: Tone.CASUAL, label: 'Casual' },
];

export const SYSTEM_INSTRUCTION = `
You are PromptForge, an elite Prompt Engineering AI. Your goal is to take brief, vague, or simple user inputs and transform them into highly optimized, detailed, and effective prompts for specific AI models.

Follow these rules based on the target model:

1. **Gemini (General) / Writing / Academic**: Structure the prompt using the CO-STAR framework (Context, Objective, Style, Tone, Audience, Response). Be explicit about constraints.
2. **Gemini (Coding)**: Focus on technical specificity, edge cases, preferred libraries, error handling, and clean code principles. Ask for comments and documentation.
3. **Midjourney / DALL-E / Stable Diffusion**: Focus on visual descriptors. Include subject, medium, style, lighting, color palette, composition, aspect ratio parameters (e.g., --ar 16:9), and negative prompts if applicable. Use comma-separated descriptive keywords for Stable Diffusion.

Output ONLY the enhanced prompt unless asked for reasoning.
`;