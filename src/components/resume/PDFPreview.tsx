import React from 'react';
import type { ResumeData } from '@/types/resume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { VibrantTemplate } from '../templates/VibrantTemplate';
import type { TemplateType } from '@/types/template';

interface PDFPreviewProps {
  data: ResumeData;
  template: TemplateType;
  sectionOrder: string[];
}

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  vibrant: VibrantTemplate,
};

export const PDFPreview: React.FC<PDFPreviewProps> = ({ data, template, sectionOrder }) => {
  if (!data) return null;

  const TemplateComponent = templates[template] || ModernTemplate;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg">
      <div className="px-[10mm] py-[20mm]">
        <div className="max-w-[190mm]">
          <TemplateComponent data={data} sectionOrder={sectionOrder} />
        </div>
      </div>
    </div>
  );
}; 