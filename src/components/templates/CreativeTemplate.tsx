import React from 'react';
import type { ResumeData } from '@/types/resume';

interface CreativeTemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resume, sectionOrder }) => {
  if (!resume) return null;

  const { personalInfo, experience, education, skills, projects, certifications = [] } = resume;

  // Map section IDs to their content
  const sectionContent: Record<string, React.ReactNode> = {
    personalInfo: (
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white transform rotate-45 translate-x-16 -translate-y-16"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-purple-100">{personalInfo.summary}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-purple-200">📧</span> {personalInfo.email}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-200">📱</span> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-200">📍</span> {personalInfo.location}
            </p>
            {personalInfo.website && (
              <p className="flex items-center gap-2">
                <span className="text-purple-200">🌐</span>
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website}
                </a>
              </p>
            )}
            {personalInfo.linkedin && (
              <p className="flex items-center gap-2">
                <span className="text-purple-200">🔗</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </p>
            )}
            {personalInfo.github && (
              <p className="flex items-center gap-2">
                <span className="text-purple-200">💻</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              </p>
            )}
          </div>
          {personalInfo.objective && ( <p className="mt-2 text-purple-100">{personalInfo.objective}</p>)}
        </div>
      </div>
    ),
    experience: experience.length > 0 && (
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
              <span className="w-8 h-1 bg-indigo-700 mr-3"></span>
              Experience
            </h2>
        <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-indigo-200">
                  <div className="absolute -left-2 w-4 h-4 rounded-full bg-indigo-600"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
              <p className="mt-1 text-gray-600">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-1 text-gray-600">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-1">
                  <p className="text-gray-600">Technologies: {exp.technologies.join(', ')}</p>
                </div>
              )}
            </div>
              ))}
            </div>
          </section>
    ),
    education: education.length > 0 && (
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
              <span className="w-8 h-1 bg-indigo-700 mr-3"></span>
              Education
            </h2>
        <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-indigo-200">
                  <div className="absolute -left-2 w-4 h-4 rounded-full bg-indigo-600"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                  {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                  {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
    ),
    skills: skills.length > 0 && (
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
              <span className="w-8 h-1 bg-indigo-700 mr-3"></span>
              Skills
            </h2>
        <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
            <div key={index} className="bg-indigo-50 p-2 rounded-lg">
              <div>
                  <span className="font-medium text-gray-800">{skill.name}</span>
                {skill.category && <span className="text-sm text-gray-600 ml-2">({skill.category})</span>}
              </div>
                  <span className="text-sm text-gray-500 ml-2">({skill.level})</span>
              {skill.description && (
                <p className="text-gray-600 text-sm mt-1">{skill.description}</p>
              )}
                </div>
              ))}
            </div>
          </section>
    ),
    projects: projects.length > 0 && (
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
              <span className="w-8 h-1 bg-indigo-700 mr-3"></span>
              Projects
            </h2>
        <div className="space-y-4">
              {projects.map((project, index) => (
            <div key={index} className="bg-indigo-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              {project.type && <p className="text-gray-600">{project.type}</p>}
              {project.status && <p className="text-gray-600">Status: {project.status}</p>}
              {project.role && <p className="text-gray-600">Role: {project.role}</p>}
              <p className="mt-1 text-gray-600">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  <p className="text-gray-600">Technologies: {project.technologies.join(', ')}</p>
                </div>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-1 text-gray-600">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
              {project.impact && (
                <p className="mt-1 text-gray-600">Impact: {project.impact}</p>
              )}
              <div className="mt-1 space-x-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    certifications: certifications.length > 0 && (
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center">
          <span className="w-8 h-1 bg-indigo-700 mr-3"></span>
          Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-indigo-200">
              <div className="absolute -left-2 w-4 h-4 rounded-full bg-indigo-600"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  {cert.description && <p className="mt-1 text-gray-600">{cert.description}</p>}
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500">Credential ID: {cert.credentialId}</p>
                  )}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-gray-600 text-right">
                  <p>Earned: {cert.date}</p>
                  {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            </div>
              ))}
            </div>
          </section>
    ),
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white shadow-lg">
      {sectionOrder.map((sectionId, index) => (
        <div key={sectionId} className={index === 0 ? 'p-8 pb-0' : 'px-8 pb-8'}>
          {sectionContent[sectionId]}
        </div>
      ))}
    </div>
  );
}; 