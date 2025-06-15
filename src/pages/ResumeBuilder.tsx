import React from 'react';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import { ExperienceSection } from '../components/resume/ExperienceSection';

const ResumeBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-sm text-gray-600">
              Create your professional resume by filling out the sections below.
            </p>
          </div>

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              <div className="mt-4">
                <PersonalInfoForm />
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <ExperienceSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 