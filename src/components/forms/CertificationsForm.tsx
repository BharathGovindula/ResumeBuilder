import React from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';

export const CertificationsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeForm();

  const handleChange = (index: number, field: string, value: string) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    updateResumeData({ certifications: updatedCertifications });
  };

  const addCertification = () => {
    updateResumeData({
      certifications: [
        ...resumeData.certifications,
        {
          name: '',
          issuer: '',
          date: '',
          link: '',
          description: ''
        }
      ]
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = resumeData.certifications.filter((_, i) => i !== index);
    updateResumeData({ certifications: updatedCertifications });
  };

  return (
    <div className="space-y-4">
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <input
                type="text"
                value={cert.issuer || ''}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Earned
              </label>
              <input
                type="text"
                value={cert.date || ''}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Credential Link
              </label>
              <input
                type="url"
                value={cert.link || ''}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={cert.description || ''}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => removeCertification(index)}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCertification}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Add Certification
      </button>
    </div>
  );
}; 