import React from 'react';
import type { ResumeData } from '@/types/resume';

interface VibrantTemplateProps {
  resume: ResumeData;
  sectionOrder: string[];
}

export const VibrantTemplate: React.FC<VibrantTemplateProps> = ({ resume, sectionOrder }) => {
  const { personalInfo, experience, education, skills, projects, certifications = [] } = resume;

  const sectionContent: Record<string, React.ReactNode> = {
    personalInfo: (
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName}</h1>
        <p className="text-lg text-white/90 mb-6">{personalInfo.summary}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-white/80">📧</span> {personalInfo.email}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-white/80">📱</span> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-white/80">📍</span> {personalInfo.location}
            </p>
          </div>
          <div className="space-y-2">
            {personalInfo.website && (
              <p className="flex items-center gap-2">
                <span className="text-white/80">🌐</span>
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website}
                </a>
              </p>
            )}
            {personalInfo.linkedin && (
              <p className="flex items-center gap-2">
                <span className="text-white/80">🔗</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </p>
            )}
            {personalInfo.github && (
              <p className="flex items-center gap-2">
                <span className="text-white/80">💻</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    ),
    experience: experience.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
          <span className="w-12 h-1 bg-purple-600 mr-3"></span>
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                  {exp.location && <p className="text-gray-600">{exp.location}</p>}
                </div>
                <p className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <p className="text-gray-600 mt-2">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ),
    education: education.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center">
          <span className="w-12 h-1 bg-indigo-600 mr-3"></span>
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-indigo-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-indigo-600 font-medium">{edu.institution}</p>
                  {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                  {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 bg-indigo-50 px-3 py-1 rounded-full">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-indigo-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    skills: skills.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
          <span className="w-12 h-1 bg-pink-600 mr-3"></span>
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-800 font-medium">{skill.name}</span>
                  {skill.category && (
                    <span className="text-gray-500 ml-2">({skill.category})</span>
                  )}
                </div>
                <span className="text-pink-600 font-medium">{skill.level}</span>
              </div>
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
        <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
          <span className="w-12 h-1 bg-purple-600 mr-3"></span>
          Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                  {project.type && <p className="text-purple-600">{project.type}</p>}
                  {project.status && <p className="text-gray-600">Status: {project.status}</p>}
                  {project.role && <p className="text-gray-600">Role: {project.role}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-3 text-gray-600">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
              {project.impact && (
                <p className="mt-3 text-gray-600">
                  <span className="font-medium">Impact:</span> {project.impact}
                </p>
              )}
              <div className="mt-4 space-x-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
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
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center">
          <span className="w-12 h-1 bg-indigo-600 mr-3"></span>
          Certifications
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
              <p className="text-indigo-600">{cert.issuer}</p>
              <p className="text-gray-500 text-sm mt-1">
                {cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-indigo-600 hover:underline text-sm"
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div className="max-w-[800px] mx-auto bg-gray-50 p-8">
      {sectionOrder.map((sectionId, index) => (
        <div key={sectionId}>
          {sectionContent[sectionId as keyof typeof sectionContent]}
        </div>
      ))}
    </div>
  );
}; 