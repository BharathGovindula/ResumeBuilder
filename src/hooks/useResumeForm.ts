import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
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
} from '../store/slices/resumeFormSlice';
import type { ResumeData } from '../types/resume';

export const useResumeForm = () => {
  const dispatch = useAppDispatch();
  const resumeData = useAppSelector((state) => state.resumeForm);

  const updatePersonalInfoField = useCallback((field: string, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  }, [dispatch]);

  const addNewEducation = useCallback(() => {
    dispatch(addEducation());
  }, [dispatch]);

  const updateEducationField = useCallback((index: number, field: string, value: string) => {
    if (typeof value === 'string') {
      dispatch(updateEducation({ index, data: { [field]: value } }));
    }
  }, [dispatch]);

  const removeEducationEntry = useCallback((index: number) => {
    dispatch(removeEducation(index));
  }, [dispatch]);

  const reorderEducationEntries = useCallback((from: number, to: number) => {
    dispatch(reorderEducation({ from, to }));
  }, [dispatch]);

  const addNewExperience = useCallback(() => {
    dispatch(addExperience());
  }, [dispatch]);

  const updateExperienceField = useCallback((index: number, field: string, value: any) => {
    if (value !== undefined && value !== null) {
      dispatch(updateExperience({ index, data: { [field]: value } }));
    }
  }, [dispatch]);

  const removeExperienceEntry = useCallback((index: number) => {
    dispatch(removeExperience(index));
  }, [dispatch]);

  const reorderExperienceEntries = useCallback((from: number, to: number) => {
    dispatch(reorderExperience({ from, to }));
  }, [dispatch]);

  const addNewSkill = useCallback(() => {
    dispatch(addSkill());
  }, [dispatch]);

  const updateSkillField = useCallback((index: number, field: string, value: string) => {
    if (typeof value === 'string') {
      dispatch(updateSkill({ index, data: { [field]: value } }));
    }
  }, [dispatch]);

  const removeSkillEntry = useCallback((index: number) => {
    dispatch(removeSkill(index));
  }, [dispatch]);

  const reorderSkillEntries = useCallback((from: number, to: number) => {
    dispatch(reorderSkills({ from, to }));
  }, [dispatch]);

  const addNewProject = useCallback(() => {
    dispatch(addProject());
  }, [dispatch]);

  const updateProjectField = useCallback((index: number, field: string, value: any) => {
    if (value !== undefined && value !== null) {
      dispatch(updateProject({ index, data: { [field]: value } }));
    }
  }, [dispatch]);

  const removeProjectEntry = useCallback((index: number) => {
    dispatch(removeProject(index));
  }, [dispatch]);

  const reorderProjectEntries = useCallback((from: number, to: number) => {
    dispatch(reorderProjects({ from, to }));
  }, [dispatch]);

  const addNewCertification = useCallback(() => {
    dispatch(addCertification());
  }, [dispatch]);

  const updateCertificationField = useCallback((index: number, field: string, value: any) => {
    if (value !== undefined && value !== null) {
      dispatch(updateCertification({ index, data: { [field]: value } }));
    }
  }, [dispatch]);

  const removeCertificationEntry = useCallback((index: number) => {
    dispatch(removeCertification(index));
  }, [dispatch]);

  const reorderCertificationEntries = useCallback((from: number, to: number) => {
    dispatch(reorderCertifications({ from, to }));
  }, [dispatch]);

  const loadResumeData = useCallback((data: ResumeData) => {
    dispatch(setResumeData(data));
  }, [dispatch]);

  return {
    resumeData,
    updatePersonalInfoField,
    addNewEducation,
    updateEducationField,
    removeEducationEntry,
    reorderEducationEntries,
    addNewExperience,
    updateExperienceField,
    removeExperienceEntry,
    reorderExperienceEntries,
    addNewSkill,
    updateSkillField,
    removeSkillEntry,
    reorderSkillEntries,
    addNewProject,
    updateProjectField,
    removeProjectEntry,
    reorderProjectEntries,
    addNewCertification,
    updateCertificationField,
    removeCertificationEntry,
    reorderCertificationEntries,
    loadResumeData,
  };
}; 