import type { ResumeData } from './resume';

export type TemplateType = 'modern' | 'classic' | 'creative' | 'professional' | 'vibrant';

export interface TemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
} 