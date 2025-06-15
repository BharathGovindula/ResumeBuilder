import React from 'react';
import type { ChangeEvent } from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import type { EducationFormData } from '../../lib/validations/resume';

type Education = EducationFormData['education'][0];

const defaultEducation: Education = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
  description: ''
};

export const EducationSection: React.FC = () => {
  const {
    resumeData,
    addNewEducation,
    removeEducationEntry,
    updateEducationField
  } = useResumeForm();

  const education = resumeData.education || [];

  const handleAddEducation = () => {
    addNewEducation();
  };

  const handleRemoveEducation = (index: number) => {
    removeEducationEntry(index);
  };

  const handleUpdateEducation = (index: number, field: keyof Education, value: string) => {
    updateEducationField(index, field, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {education.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education Entry {index + 1}</h3>
        <Button
                  variant="destructive"
                  onClick={() => handleRemoveEducation(index)}
        >
                  Remove
        </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
              value={entry.institution}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateEducation(index, 'institution', e.target.value)
                    }
                    placeholder="University of Example"
            />
                </div>

                <div>
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
              value={entry.degree}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateEducation(index, 'degree', e.target.value)
                    }
                    placeholder="Bachelor of Science"
            />
                </div>

                <div>
                  <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                  <Input
                    id={`fieldOfStudy-${index}`}
              value={entry.fieldOfStudy}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateEducation(index, 'fieldOfStudy', e.target.value)
                    }
                    placeholder="Computer Science"
            />
                </div>

                <div>
                  <Label htmlFor={`gpa-${index}`}>GPA</Label>
                  <Input
                    id={`gpa-${index}`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={entry.gpa}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateEducation(index, 'gpa', e.target.value)
                    }
                    placeholder="3.8"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                type="date"
                value={entry.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleUpdateEducation(index, 'startDate', e.target.value)
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
                      handleUpdateEducation(index, 'endDate', e.target.value)
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
                    handleUpdateEducation(index, 'description', e.target.value)
                  }
                  placeholder="Describe your education experience..."
                  rows={4}
            />
              </div>
            </div>
      ))}

          <Button
            onClick={handleAddEducation}
            variant="outline"
            className="w-full"
          >
            Add Education
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 