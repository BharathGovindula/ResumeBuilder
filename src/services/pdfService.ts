import html2pdf from 'html2pdf.js';
import type { ResumeData } from '../types/resume';

interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  margin?: number;
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    logging?: boolean;
  };
  jsPDF?: {
    unit?: string;
    format?: string;
    orientation?: string;
  };
}

const defaultOptions: PDFOptions = {
  filename: 'resume.pdf',
  format: 'a4',
  orientation: 'portrait',
  margin: 10,
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  }
};

export const generatePDF = async (element: HTMLElement, options: PDFOptions = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    await html2pdf()
      .set(mergedOptions)
      .from(element)
      .save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const getDefaultFilename = (resumeData: ResumeData): string => {
  const name = resumeData.personalInfo?.fullName || 'resume';
  return `${name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
}; 