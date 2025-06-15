import React from 'react';
import type { ChangeEvent } from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import type { ExperienceFormData } from '../../lib/validations/resume';

type Experience = ExperienceFormData['experience'][0];

const defaultExperience: Experience = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
  achievements: [],
  technologies: []
};

export const ExperienceSection: React.FC = () => {
  const {
    resumeData,
    addNewExperience,
    removeExperienceEntry,
    updateExperienceField
  } = useResumeForm();

  const experience = resumeData.experience || [];

  const handleAddExperience = () => {
    addNewExperience();
  };

  const handleRemoveExperience = (index: number) => {
    removeExperienceEntry(index);
  };

  const handleUpdateExperience = (index: number, field: keyof Experience, value: any) => {
    updateExperienceField(index, field, value);
  };

  const handleArrayFieldChange = (
    index: number,
    field: 'technologies' | 'achievements',
    itemIndex: number,
    value: string
  ) => {
    const entry = experience[index];
    const newArray = [...(entry[field] || [])];
    newArray[itemIndex] = value;
    handleUpdateExperience(index, field, newArray);
  };

  const addArrayItem = (index: number, field: 'technologies' | 'achievements') => {
    const entry = experience[index];
    const newArray = [...(entry[field] || []), ''];
    handleUpdateExperience(index, field, newArray);
  };

  const removeArrayItem = (index: number, field: 'technologies' | 'achievements', itemIndex: number) => {
    const entry = experience[index];
    const newArray = [...(entry[field] || [])];
    newArray.splice(itemIndex, 1);
    handleUpdateExperience(index, field, newArray);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experience.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experience Entry {index + 1}</h3>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={entry.company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateExperience(index, 'company', e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={entry.position}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateExperience(index, 'position', e.target.value)
                    }
                    placeholder="Job Title"
                  />
                </div>

                <div>
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={entry.location}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateExperience(index, 'location', e.target.value)
                    }
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={entry.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateExperience(index, 'startDate', e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={entry.endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateExperience(index, 'endDate', e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={entry.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                    handleUpdateExperience(index, 'description', e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Technologies</Label>
                <div className="space-y-2">
                  {(entry.technologies || []).map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2">
                      <Input
                        value={tech}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleArrayFieldChange(index, 'technologies', techIndex, e.target.value)
                        }
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
                    onClick={() => addArrayItem(index, 'technologies')}
                  >
                    Add Technology
                  </Button>
                </div>
              </div>

              <div>
                <Label>Achievements</Label>
                <div className="space-y-2">
                  {(entry.achievements || []).map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleArrayFieldChange(index, 'achievements', achievementIndex, e.target.value)
                        }
                        placeholder="Achievement"
                      />
                      <Button
                        variant="destructive"
                        onClick={() => removeArrayItem(index, 'achievements', achievementIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayItem(index, 'achievements')}
                  >
                    Add Achievement
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button
            onClick={handleAddExperience}
            variant="outline"
            className="w-full"
          >
            Add Experience
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 