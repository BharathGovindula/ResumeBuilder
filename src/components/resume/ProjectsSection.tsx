import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useResumeForm } from '../../hooks/useResumeForm';
import { Textarea } from '../ui/textarea';

export const ProjectsSection: React.FC = () => {
  const {
    resumeData,
    addNewProject: handleAddProject,
    removeProjectEntry: handleRemoveProject,
    updateProjectField: handleUpdateProject,
  } = useResumeForm();

  const projects = resumeData.projects || [];

  const handleArrayFieldChange = (index: number, field: string, value: string) => {
    const currentValue = projects[index][field] || [];
    const newValue = [...currentValue, value];
    handleUpdateProject(index, field, newValue);
  };

  const removeArrayItem = (index: number, field: string, itemIndex: number) => {
    const currentValue = projects[index][field] || [];
    const newValue = currentValue.filter((_, i) => i !== itemIndex);
    handleUpdateProject(index, field, newValue);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                  <Input
                    id={`project-title-${index}`}
                    value={project.title || ''}
                    onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                    placeholder="e.g., E-commerce Website, Mobile App"
                  />
                </div>

                <div>
                  <Label htmlFor={`project-description-${index}`}>Description</Label>
                  <Textarea
                    id={`project-description-${index}`}
                    value={project.description || ''}
                    onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                    placeholder="Detailed description of the project (50-1000 characters)"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>Technologies Used</Label>
                  <div className="space-y-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <div key={techIndex} className="flex gap-2">
                        <Input
                          value={tech}
                          onChange={(e) => {
                            const newTechs = [...(project.technologies || [])];
                            newTechs[techIndex] = e.target.value;
                            handleUpdateProject(index, 'technologies', newTechs);
                          }}
                          placeholder="Technology"
                        />
                        <Button
                          variant="destructive"
                          onClick={() => removeArrayItem(index, 'technologies', techIndex)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleArrayFieldChange(index, 'technologies', '')}
                    >
                      Add Technology
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Project Highlights</Label>
                  <div className="space-y-2">
                    {(project.highlights || []).map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex gap-2">
                        <Input
                          value={highlight}
                          onChange={(e) => {
                            const newHighlights = [...(project.highlights || [])];
                            newHighlights[highlightIndex] = e.target.value;
                            handleUpdateProject(index, 'highlights', newHighlights);
                          }}
                          placeholder="Project highlight (10-200 characters)"
                        />
                        <Button
                          variant="destructive"
                          onClick={() => removeArrayItem(index, 'highlights', highlightIndex)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleArrayFieldChange(index, 'highlights', '')}
                    >
                      Add Highlight
                    </Button>
                  </div>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`project-start-${index}`}>Start Date</Label>
                    <Input
                      id={`project-start-${index}`}
                      type="date"
                      value={project.startDate || ''}
                      onChange={(e) => handleUpdateProject(index, 'startDate', e.target.value)}
                    />
              </div>
                  <div>
                    <Label htmlFor={`project-end-${index}`}>End Date</Label>
                      <Input
                      id={`project-end-${index}`}
                      type="date"
                      value={project.endDate || ''}
                      onChange={(e) => handleUpdateProject(index, 'endDate', e.target.value)}
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`project-url-${index}`}>Repository URL</Label>
                    <Input
                      id={`project-url-${index}`}
                      value={project.url || ''}
                      onChange={(e) => handleUpdateProject(index, 'url', e.target.value)}
                      placeholder="e.g., https://github.com/username/project"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-demo-${index}`}>Demo URL</Label>
                    <Input
                      id={`project-demo-${index}`}
                      value={project.demoUrl || ''}
                      onChange={(e) => handleUpdateProject(index, 'demoUrl', e.target.value)}
                      placeholder="e.g., https://project-demo.com"
                    />
                </div>
              </div>

                        <Button
                          variant="destructive"
                onClick={() => handleRemoveProject(index)}
                  className="w-full"
              >
                  Remove Project
                  </Button>
              </div>
            </div>
          ))}

            <Button
            onClick={handleAddProject}
              variant="outline"
            className="w-full"
          >
              Add Project
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}; 