import React from 'react';
import type { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resume, sectionOrder }) => {
  const { personalInfo, experience, education, skills, projects, certifications = [] } = resume;

  // Map section IDs to their content
  const sectionContent: Record<string, React.ReactNode> = {
    personalInfo: (
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
        </div>
        {personalInfo.website && (
          <div className="text-gray-700">
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              {personalInfo.website}
            </a>
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="text-gray-700">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              LinkedIn
            </a>
          </div>
        )}
        {personalInfo.github && (
          <div className="text-gray-700">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              GitHub
            </a>
          </div>
        )}
        {personalInfo.summary && (
          <p className="mt-4 text-gray-700 italic">{personalInfo.summary}</p>
        )}
        {personalInfo.objective && (
          <p className="mt-2 text-gray-700 italic">{personalInfo.objective}</p>
        )}
      </header>
    ),
    experience: experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-serif text-gray-900 border-b border-gray-300 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  {exp.location && <p className="text-gray-700">{exp.location}</p>}
                  </div>
                  <div className="text-gray-600">
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
                  <p className="text-gray-700">Technologies: {exp.technologies.join(', ')}</p>
                </div>
              )}
              </div>
            ))}
          </div>
        </section>
    ),
    education: education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-serif text-gray-900 border-b border-gray-300 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                {edu.fieldOfStudy && <p className="text-gray-700">{edu.fieldOfStudy}</p>}
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                </div>
                <div className="text-gray-600">
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
          <h2 className="text-2xl font-serif text-gray-900 border-b border-gray-300 pb-2 mb-4">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
              <div>
                <span className="text-gray-900 font-medium">{skill.name}</span>
                {skill.category && <span className="text-gray-700 ml-2">({skill.category})</span>}
              </div>
                <span className="text-gray-600">{skill.level}</span>
              {skill.description && (
                <p className="text-gray-700 text-sm mt-1">{skill.description}</p>
              )}
              </div>
            ))}
          </div>
        </section>
    ),
    projects: projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-serif text-gray-900 border-b border-gray-300 pb-2 mb-4">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="mb-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-serif text-gray-900">{project.title}</h3>
                <div className="text-gray-600">
                  <p>{project.startDate} - {project.endDate}</p>
                </div>
              </div>
              {project.type && <p className="text-gray-700">{project.type}</p>}
              {project.status && <p className="text-gray-700">Status: {project.status}</p>}
              {project.role && <p className="text-gray-700">Role: {project.role}</p>}
                <p className="mt-2 text-gray-700">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-gray-700 mt-1">
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
                    className="text-gray-900 hover:underline"
                  >
                    Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:underline"
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
      <section className="mb-6">
        <h2 className="text-2xl font-serif text-gray-900 border-b border-gray-300 pb-2 mb-4">
          Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-serif text-gray-900">{cert.name}</h3>
                <p className="text-gray-700">{cert.issuer}</p>
                {cert.description && <p className="text-gray-600 mt-1">{cert.description}</p>}
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
                    className="text-gray-900 hover:underline text-sm"
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
          {sectionContent[sectionId]}
        </div>
      ))}
    </div>
  );
}; 