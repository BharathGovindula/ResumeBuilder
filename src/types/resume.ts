export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin: string;
  github: string;
  website: string;
  objective?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
  achievements?: string[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  achievements?: string[];
  technologies?: string[];
}

export interface Skill {
  name: string;
  level: string;
  category: string;
  description?: string;
  yearsOfExperience?: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  demoUrl?: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
  role?: string;
  type?: string;
  status?: string;
  impact?: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description: string;
  credentialId?: string;
  expiryDate?: string;
  skills?: string[];
}

export type SectionType = 'personalInfo' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
} 