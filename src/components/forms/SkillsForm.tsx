import React from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';

export const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeForm();

  const handleChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    updateResumeData({ skills: updatedSkills });
  };

  const addSkill = () => {
    updateResumeData({
      skills: [
        ...resumeData.skills,
        {
          name: '',
          level: '',
          category: ''
        }
      ]
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    updateResumeData({ skills: updatedSkills });
  };

  return (
    <div className="space-y-4">
      {resumeData.skills.map((skill, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <input
                type="text"
                value={skill.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                value={skill.level || ''}
                onChange={(e) => handleChange(index, 'level', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={skill.category || ''}
                onChange={(e) => handleChange(index, 'category', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Add Skill
      </button>
    </div>
  );
}; 