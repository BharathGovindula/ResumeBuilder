import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ResumeData, PersonalInfo, Education, Experience, Skill, Project, Certification } from '../../types/resume';

interface ResumeFormState extends ResumeData {
  isDirty: boolean;
}

const initialState: ResumeFormState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  isDirty: false,
};

const resumeFormSlice = createSlice({
  name: 'resumeForm',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      if (!state.personalInfo) {
        state.personalInfo = { ...initialState.personalInfo };
      }
      state.personalInfo = { ...state.personalInfo, ...action.payload };
      state.isDirty = true;
    },
    addEducation: (state) => {
      if (!state.education) {
        state.education = [];
      }
      state.education.push({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      state.isDirty = true;
    },
    updateEducation: (state, action: PayloadAction<{ index: number; data: Partial<Education> }>) => {
      const { index, data } = action.payload;
      if (!state.education) {
        state.education = [];
      }
      if (state.education[index]) {
        state.education[index] = { ...state.education[index], ...data };
        state.isDirty = true;
      }
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      if (!state.education) {
        state.education = [];
      }
      state.education.splice(action.payload, 1);
      state.isDirty = true;
    },
    reorderEducation: (state, action: PayloadAction<{ from: number; to: number }>) => {
      if (!state.education) {
        state.education = [];
      }
      const { from, to } = action.payload;
      const [removed] = state.education.splice(from, 1);
      state.education.splice(to, 0, removed);
      state.isDirty = true;
    },
    addExperience: (state) => {
      if (!state.experience) {
        state.experience = [];
      }
      state.experience.push({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: [],
        technologies: [],
      });
      state.isDirty = true;
    },
    updateExperience: (state, action: PayloadAction<{ index: number; data: Partial<Experience> }>) => {
      const { index, data } = action.payload;
      if (!state.experience) {
        state.experience = [];
      }
      if (state.experience[index]) {
        state.experience[index] = { ...state.experience[index], ...data };
        state.isDirty = true;
      }
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      if (!state.experience) {
        state.experience = [];
      }
      state.experience.splice(action.payload, 1);
      state.isDirty = true;
    },
    reorderExperience: (state, action: PayloadAction<{ from: number; to: number }>) => {
      if (!state.experience) {
        state.experience = [];
      }
      const { from, to } = action.payload;
      const [removed] = state.experience.splice(from, 1);
      state.experience.splice(to, 0, removed);
      state.isDirty = true;
    },
    addSkill: (state) => {
      if (!state.skills) {
        state.skills = [];
      }
      state.skills.push({
        name: '',
        level: 'Beginner',
        category: '',
      });
      state.isDirty = true;
    },
    updateSkill: (state, action: PayloadAction<{ index: number; data: Partial<Skill> }>) => {
      const { index, data } = action.payload;
      if (!state.skills) {
        state.skills = [];
      }
      if (state.skills[index]) {
        state.skills[index] = { ...state.skills[index], ...data };
        state.isDirty = true;
      }
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      if (!state.skills) {
        state.skills = [];
      }
      state.skills.splice(action.payload, 1);
      state.isDirty = true;
    },
    reorderSkills: (state, action: PayloadAction<{ from: number; to: number }>) => {
      if (!state.skills) {
        state.skills = [];
      }
      const { from, to } = action.payload;
      const [removed] = state.skills.splice(from, 1);
      state.skills.splice(to, 0, removed);
      state.isDirty = true;
    },
    addProject: (state) => {
      if (!state.projects) {
        state.projects = [];
      }
      state.projects.push({
        title: '',
        description: '',
        technologies: [],
        startDate: '',
        endDate: '',
        achievements: [],
      });
      state.isDirty = true;
    },
    updateProject: (state, action: PayloadAction<{ index: number; data: Partial<Project> }>) => {
      const { index, data } = action.payload;
      if (!state.projects) {
        state.projects = [];
      }
      if (state.projects[index]) {
        state.projects[index] = { ...state.projects[index], ...data };
        state.isDirty = true;
      }
    },
    removeProject: (state, action: PayloadAction<number>) => {
      if (!state.projects) {
        state.projects = [];
      }
      state.projects.splice(action.payload, 1);
      state.isDirty = true;
    },
    reorderProjects: (state, action: PayloadAction<{ from: number; to: number }>) => {
      if (!state.projects) {
        state.projects = [];
      }
      const { from, to } = action.payload;
      const [removed] = state.projects.splice(from, 1);
      state.projects.splice(to, 0, removed);
      state.isDirty = true;
    },
    addCertification: (state) => {
      if (!state.certifications) {
        state.certifications = [];
      }
      state.certifications.push({
        name: '',
        issuer: '',
        date: '',
        description: '',
        skills: [],
      });
      state.isDirty = true;
    },
    updateCertification: (state, action: PayloadAction<{ index: number; data: Partial<Certification> }>) => {
      const { index, data } = action.payload;
      if (!state.certifications) {
        state.certifications = [];
      }
      if (state.certifications[index]) {
        state.certifications[index] = { ...state.certifications[index], ...data };
        state.isDirty = true;
      }
    },
    removeCertification: (state, action: PayloadAction<number>) => {
      if (!state.certifications) {
        state.certifications = [];
      }
      state.certifications.splice(action.payload, 1);
      state.isDirty = true;
    },
    reorderCertifications: (state, action: PayloadAction<{ from: number; to: number }>) => {
      if (!state.certifications) {
        state.certifications = [];
      }
      const { from, to } = action.payload;
      const [removed] = state.certifications.splice(from, 1);
      state.certifications.splice(to, 0, removed);
      state.isDirty = true;
    },
    setResumeData: (state, action: PayloadAction<ResumeData>) => {
      return {
        ...action.payload,
        isDirty: false,
        personalInfo: action.payload.personalInfo || initialState.personalInfo,
        education: action.payload.education || [],
        experience: action.payload.experience || [],
        skills: action.payload.skills || [],
        projects: action.payload.projects || [],
        certifications: action.payload.certifications || [],
      };
    },
  },
});

export const {
  updatePersonalInfo,
  addEducation,
  updateEducation,
  removeEducation,
  reorderEducation,
  addExperience,
  updateExperience,
  removeExperience,
  reorderExperience,
  addSkill,
  updateSkill,
  removeSkill,
  reorderSkills,
  addProject,
  updateProject,
  removeProject,
  reorderProjects,
  addCertification,
  updateCertification,
  removeCertification,
  reorderCertifications,
  setResumeData,
} = resumeFormSlice.actions;

export default resumeFormSlice.reducer; 