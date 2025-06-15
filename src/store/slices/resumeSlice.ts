import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ResumeData } from '@/types/resume';

interface ResumeState extends ResumeData {
  isDirty: boolean;
}

const initialState: ResumeState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  isDirty: false,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<ResumeData>>) => {
      Object.assign(state, action.payload);
      state.isDirty = true;
    },
    resetFormData: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setFormData, resetFormData } = resumeSlice.actions;
export default resumeSlice.reducer; 