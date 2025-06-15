import { z } from "zod";

// Common validation patterns
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phonePattern = /^\+?[1-9]\d{1,14}$/;
const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Personal Information Schema
export const personalInfoSchema = z.object({
  personalInfo: z.object({
    fullName: z.string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: z.string()
      .email("Invalid email address")
      .regex(emailPattern, "Invalid email format"),
    phone: z.string()
      .regex(phonePattern, "Invalid phone number"),
    location: z.string()
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be less than 100 characters"),
    summary: z.string()
      .min(50, "Summary must be at least 50 characters")
      .max(500, "Summary must be less than 500 characters"),
    website: z.string()
      .regex(urlPattern, "Invalid website URL")
      .optional()
      .or(z.literal("")),
    linkedin: z.string()
      .regex(urlPattern, "Invalid LinkedIn URL")
      .optional()
      .or(z.literal("")),
    github: z.string()
      .regex(urlPattern, "Invalid GitHub URL")
      .optional()
      .or(z.literal("")),
    objective: z.string()
      .min(50, "Objective must be at least 50 characters")
      .max(500, "Objective must be less than 500 characters")
      .optional()
      .or(z.literal("")),
  }),
});

// Education Schema with enhanced validation
export const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z.string()
        .min(2, "Institution name must be at least 2 characters")
        .max(100, "Institution name must be less than 100 characters"),
      degree: z.string()
        .min(2, "Degree must be at least 2 characters")
        .max(100, "Degree must be less than 100 characters"),
      fieldOfStudy: z.string()
        .min(2, "Field of study must be at least 2 characters")
        .max(100, "Field of study must be less than 100 characters"),
      startDate: z.string()
        .min(1, "Start date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
      endDate: z.string()
        .min(1, "End date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
      gpa: z.string()
        .regex(/^[0-4]\.\d{1,2}$/, "GPA must be between 0.00 and 4.00")
        .optional()
        .or(z.literal("")),
      description: z.string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    })
  ),
});

// Skills Schema with enhanced validation
export const skillsSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string()
        .min(2, "Skill name must be at least 2 characters")
        .max(50, "Skill name must be less than 50 characters"),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
        required_error: "Please select a proficiency level",
      }),
      category: z.string()
        .min(2, "Category must be at least 2 characters")
        .max(50, "Category must be less than 50 characters"),
      description: z.string()
        .max(200, "Description must be less than 200 characters")
        .optional(),
    })
  ),
});

// Projects Schema with enhanced validation
export const projectsSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string()
        .min(2, "Project title must be at least 2 characters")
        .max(100, "Project title must be less than 100 characters"),
      description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(1000, "Description must be less than 1000 characters"),
      startDate: z.string()
        .min(1, "Start date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
      endDate: z.string()
        .min(1, "End date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
      technologies: z.array(
        z.string()
          .min(2, "Technology must be at least 2 characters")
          .max(50, "Technology must be less than 50 characters")
      ).optional(),
      url: z.string()
        .regex(urlPattern, "Invalid repository URL")
        .optional()
        .or(z.literal("")),
      demoUrl: z.string()
        .regex(urlPattern, "Invalid demo URL")
        .optional()
        .or(z.literal("")),
      type: z.string()
        .min(2, "Project type must be at least 2 characters")
        .max(50, "Project type must be less than 50 characters")
        .optional(),
      status: z.string()
        .min(2, "Project status must be at least 2 characters")
        .max(50, "Project status must be less than 50 characters")
        .optional(),
      role: z.string()
        .min(2, "Project role must be at least 2 characters")
        .max(50, "Project role must be less than 50 characters")
        .optional(),
      highlights: z.array(
        z.string()
          .min(10, "Highlight must be at least 10 characters")
          .max(200, "Highlight must be less than 200 characters")
      ).optional(),
      impact: z.string()
        .max(500, "Impact description must be less than 500 characters")
        .optional(),
    })
  ),
});

// Experience Schema
export const experienceSchema = z.object({
  experience: z.array(
    z.object({
      company: z.string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name must be less than 100 characters"),
      position: z.string()
        .min(2, "Position must be at least 2 characters")
        .max(100, "Position must be less than 100 characters"),
      location: z.string()
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location must be less than 100 characters"),
      startDate: z.string()
        .min(1, "Start date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
      endDate: z.string()
        .min(1, "End date is required")
        .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
      description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(1000, "Description must be less than 1000 characters"),
      achievements: z.array(
        z.string()
          .min(10, "Achievement must be at least 10 characters")
          .max(200, "Achievement must be less than 200 characters")
      ).optional(),
      technologies: z.array(
        z.string()
          .min(2, "Technology must be at least 2 characters")
          .max(50, "Technology must be less than 50 characters")
      ).optional(),
    })
  ),
});

// Complete Resume Schema
export const resumeSchema = z.object({
  personalInfo: personalInfoSchema.shape.personalInfo,
  education: educationSchema.shape.education,
  experience: experienceSchema.shape.experience,
  skills: skillsSchema.shape.skills,
  projects: projectsSchema.shape.projects,
});

// Type exports
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type ProjectsFormData = z.infer<typeof projectsSchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>; 