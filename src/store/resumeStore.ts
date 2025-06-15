import { create } from 'zustand';
import { ResumeData, SectionType } from '../types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
  reorderSections: (from: number, to: number) => void;
  addSectionItem: (section: SectionType, item: any) => void;
  removeSectionItem: (section: SectionType, index: number) => void;
  updateSectionItem: (section: SectionType, index: number, item: any) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
    website: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: []
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  updateResumeData: (data) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...data }
    })),
  resetResumeData: () => set({ resumeData: initialResumeData }),
  reorderSections: (from, to) =>
    set((state) => {
      const sections = Object.keys(state.resumeData) as SectionType[];
      const newSections = [...sections];
      const [movedSection] = newSections.splice(from, 1);
      newSections.splice(to, 0, movedSection);
      
      const newResumeData = { ...state.resumeData };
      newSections.forEach((section) => {
        newResumeData[section] = state.resumeData[section];
      });
      
      return { resumeData: newResumeData };
    }),
  addSectionItem: (section, item) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [section]: [...state.resumeData[section], item]
      }
    })),
  removeSectionItem: (section, index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [section]: state.resumeData[section].filter((_, i) => i !== index)
      }
    })),
  updateSectionItem: (section, index, item) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [section]: state.resumeData[section].map((existingItem, i) =>
          i === index ? { ...existingItem, ...item } : existingItem
        )
      }
    }))
})); 