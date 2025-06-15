import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import type { ResumeData } from '../types/resume';

const RESUME_COLLECTION = 'resumes';

const validateResumeData = (data: ResumeData): boolean => {
  // Ensure personalInfo exists
  if (!data.personalInfo) {
    throw new Error('Personal information is required');
  }

  // Check required fields with more permissive validation
  if (!data.personalInfo.fullName || typeof data.personalInfo.fullName !== 'string' || data.personalInfo.fullName.trim() === '') {
    throw new Error('Full name is required');
  }

  if (!data.personalInfo.email || typeof data.personalInfo.email !== 'string' || data.personalInfo.email.trim() === '') {
    throw new Error('Email is required');
  }

  // Validate email format only if email is provided
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.personalInfo.email.trim() && !emailRegex.test(data.personalInfo.email.trim())) {
    throw new Error('Invalid email format');
  }

  // Validate phone number only if provided and not empty
  if (data.personalInfo.phone && data.personalInfo.phone.trim() !== '') {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(data.personalInfo.phone.trim())) {
      throw new Error('Invalid phone number format');
    }
  }

  // Validate URLs only if provided and not empty
  const validateUrl = (url: string | undefined, fieldName: string) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return; // Skip validation for empty or undefined URLs
    }
    
    try {
      // More permissive URL validation
      const urlToValidate = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
      new URL(urlToValidate); // Just check if it's a valid URL
    } catch (e) {
      throw new Error(`Invalid ${fieldName} URL`);
    }
  };

  // Validate URLs only if they exist and are not empty
  if (data.personalInfo.website) validateUrl(data.personalInfo.website, 'website');
  if (data.personalInfo.linkedin) validateUrl(data.personalInfo.linkedin, 'LinkedIn');
  if (data.personalInfo.github) validateUrl(data.personalInfo.github, 'GitHub');

  // Validate dates in experience and education
  const validateDate = (date: string | undefined, fieldName: string) => {
    if (!date || typeof date !== 'string' || date.trim() === '') {
      return; // Skip validation for empty or undefined dates
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date.trim())) {
      throw new Error(`Invalid ${fieldName} date format (YYYY-MM-DD)`);
    }
  };

  // Validate experience dates only if experience exists
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp, index) => {
      if (exp.startDate) validateDate(exp.startDate, `start date in experience ${index + 1}`);
      if (exp.endDate) validateDate(exp.endDate, `end date in experience ${index + 1}`);
    });
  }

  // Validate education dates only if education exists
  if (data.education && Array.isArray(data.education)) {
    data.education.forEach((edu, index) => {
      if (edu.startDate) validateDate(edu.startDate, `start date in education ${index + 1}`);
      if (edu.endDate) validateDate(edu.endDate, `end date in education ${index + 1}`);
    });
  }

  return true;
};

export const saveResume = async (userId: string, resumeData: ResumeData) => {
  try {
    console.log('Attempting to save resume for user:', userId);
    console.log('Resume data:', resumeData);
    
    // Ensure required arrays exist
    const dataToSave = {
      ...resumeData,
      education: resumeData.education || [],
      experience: resumeData.experience || [],
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
      certifications: resumeData.certifications || [],
      updatedAt: new Date().toISOString(),
      userId,
    };
    
    // Validate data before saving
    validateResumeData(dataToSave);
    
    const resumeRef = doc(db, RESUME_COLLECTION, userId);
    console.log('Created document reference:', resumeRef);
    
    await setDoc(resumeRef, dataToSave);
    console.log('Successfully saved resume data');
    return true;
  } catch (error) {
    console.error('Error saving resume:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export const getResume = async (userId: string) => {
  try {
    const resumeRef = doc(db, RESUME_COLLECTION, userId);
    const resumeDoc = await getDoc(resumeRef);
    
    if (resumeDoc.exists()) {
      const data = resumeDoc.data() as ResumeData;
      // Ensure required arrays exist
      const validatedData = {
        ...data,
        education: data.education || [],
        experience: data.experience || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
      };
      // Validate data after retrieving
      validateResumeData(validatedData);
      return validatedData;
    }
    return null;
  } catch (error) {
    console.error('Error getting resume:', error);
    throw error;
  }
};

export const updateResume = async (userId: string, resumeData: Partial<ResumeData>) => {
  try {
    // Get existing data
    const existingData = await getResume(userId);
    if (!existingData) {
      throw new Error('Resume not found');
    }

    // Merge with existing data and validate
    const mergedData = {
      ...existingData,
      ...resumeData,
      education: resumeData.education || existingData.education || [],
      experience: resumeData.experience || existingData.experience || [],
      skills: resumeData.skills || existingData.skills || [],
      projects: resumeData.projects || existingData.projects || [],
      certifications: resumeData.certifications || existingData.certifications || [],
    };
    
    validateResumeData(mergedData as ResumeData);

    const resumeRef = doc(db, RESUME_COLLECTION, userId);
    await updateDoc(resumeRef, {
      ...resumeData,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

export const deleteResume = async (userId: string) => {
  try {
    const resumeRef = doc(db, RESUME_COLLECTION, userId);
    await deleteDoc(resumeRef);
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
}; 