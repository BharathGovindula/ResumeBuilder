import React from 'react';
import type { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume, sectionOrder }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = resume;
  

  const sectionContent: Record<string, React.ReactNode> = {
    personalInfo: personalInfo && (
      <section className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
          <div className="flex justify-center items-center gap-4 mt-2 text-gray-600">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
          {personalInfo.website && (
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1"
            >
              {personalInfo.website}
            </a>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-4"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-4"
            >
              GitHub
            </a>
          )}
        </div>
        {personalInfo.summary && (
          <p className="text-gray-700 text-center">{personalInfo.summary}</p>
        )}
      </section>
    ),
    experience: experience.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-gray-600">{exp.location}</p>}
                </div>
                <div className="text-gray-600 text-right">
                  <p>{exp.startDate} - {exp.endDate}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600">Technologies: {exp.technologies.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ),
    education: education.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
              <div className="text-gray-600 text-right">
                <p>{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    skills: skills.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <span className="text-gray-800">{skill.name}</span>
                {skill.category && <span className="text-gray-600 ml-2">({skill.category})</span>}
              </div>
              <span className="text-gray-600">{skill.level}</span>
              {skill.description && (
                <p className="text-gray-600 text-sm mt-1">{skill.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    ),
    projects: projects.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
          Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                <div className="text-gray-600 text-right">
                  <p>{project.startDate} - {project.endDate}</p>
                </div>
              </div>
              {project.type && <p className="text-gray-600">{project.type}</p>}
              {project.status && <p className="text-gray-600">Status: {project.status}</p>}
              {project.role && <p className="text-gray-600">Role: {project.role}</p>}
              <p className="mt-2 text-gray-700">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-gray-600 mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
              {project.impact && (
                <p className="mt-2 text-gray-700">Impact: {project.impact}</p>
              )}
              <div className="mt-2 space-x-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
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
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
          Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                {cert.description && <p className="text-gray-700 mt-1">{cert.description}</p>}
                {cert.credentialId && (
                  <p className="text-sm text-gray-600">Credential ID: {cert.credentialId}</p>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
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
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Credential
                  </a>
                )}
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
          {sectionContent[sectionId as keyof typeof sectionContent]}
        </div>
      ))}
    </div>
  );
}; 