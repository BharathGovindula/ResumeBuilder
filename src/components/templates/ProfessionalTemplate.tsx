import React from 'react';
import type { ResumeData } from '@/types/resume';
import { formatDate } from '@/lib/utils';

interface ProfessionalTemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resume, sectionOrder }) => {
  const { personalInfo, experience, education, skills, projects, certifications = [] } = resume;

  return (
    <div className="max-w-[800px] mx-auto bg-white shadow-lg">
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div className="w-1/3 pr-6">
            {/* Personal Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
              <div className="space-y-2 text-gray-600">
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {personalInfo.website}
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-700">{skill.name}</p>
                      {skill.level && <p className="text-sm text-gray-600">{skill.level}</p>}
                      {skill.description && <p className="text-sm text-gray-600">{skill.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h2>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-700">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-600">{cert.date}</p>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          View Credential
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-2/3 pl-6 border-l border-gray-200">
            {/* Summary */}
            {personalInfo.summary && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
                <p className="text-gray-600">{personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-600">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside mt-2 text-gray-600">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.institution}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                        </p>
                      </div>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-800">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                      {project.technologies && (
                        <p className="text-sm text-gray-500 mt-1">
                          Technologies: {project.technologies.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 