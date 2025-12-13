export enum TargetModel {
  GEMINI_GENERAL = 'Gemini (General)',
  GEMINI_CODING = 'Gemini (Coding)',
  MIDJOURNEY = 'Midjourney',
  STABLE_DIFFUSION = 'Stable Diffusion',
  DALLE = 'DALL-E 3',
  WRITING_ASSISTANT = 'Creative Writing',
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  CREATIVE = 'Creative',
  CONCISE = 'Concise',
  ACADEMIC = 'Academic',
  CASUAL = 'Casual',
}

export interface HistoryItem {
  id: string;
  original: string;
  enhanced: string;
  model: TargetModel;
  timestamp: number;
}

export interface GenerationConfig {
  targetModel: TargetModel;
  tone: Tone;
  includeReasoning: boolean;
}