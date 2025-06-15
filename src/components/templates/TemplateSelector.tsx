import React from 'react';
import type { TemplateType } from '@/types/template';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional design' },
    { id: 'classic', name: 'Classic', description: 'Traditional and formal layout' },
    { id: 'creative', name: 'Creative', description: 'Modern and unique style' },
    { id: 'vibrant', name: 'Vibrant', description: 'Colorful and energetic design' },
  ];

  return (
    <div className="flex items-center gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template.id as TemplateType)}
          className={`flex-1 min-w-[120px] p-3 rounded-lg border-2 transition-all ${
            selectedTemplate === template.id
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-blue-400'
          }`}
        >
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{template.name}</h3>
          <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
        </button>
      ))}
    </div>
  );
}; 