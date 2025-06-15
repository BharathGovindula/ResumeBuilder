import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useResumeForm } from '../../hooks/useResumeForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { Skill } from '../../types/resume';

export const SkillsSection: React.FC = () => {
  const {
    resumeData,
    addNewSkill,
    removeSkillEntry,
    updateSkillField
  } = useResumeForm();

  const skills = resumeData.skills || [];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
  const skillCategories = [
    'Programming Languages',
    'Frameworks',
    'Databases',
    'Tools',
    'Soft Skills',
    'Other'
  ] as const;

  const handleAddNewSkill = () => {
    addNewSkill();
  };

  const handleUpdateSkill = (index: number, field: keyof Skill, value: string) => {
    updateSkillField(index, field, value);
  };

  const handleRemoveSkill = (index: number) => {
    removeSkillEntry(index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor={`skill-name-${index}`}>Skill Name</Label>
                  <Input
                    id={`skill-name-${index}`}
                    value={skill.name || ''}
                    onChange={(e) => {
                      e.preventDefault();
                      handleUpdateSkill(index, 'name', e.target.value);
                    }}
                    placeholder="e.g., JavaScript, React, Project Management"
                  />
                </div>

                <div>
                  <Label htmlFor={`skill-level-${index}`}>Proficiency Level</Label>
                    <Select
                    value={skill.level || 'Beginner'}
                    onValueChange={(value) => {
                      handleUpdateSkill(index, 'level', value);
                    }}
                    >
                    <SelectTrigger id={`skill-level-${index}`}>
                      <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                <div>
                  <Label htmlFor={`skill-category-${index}`}>Category</Label>
                    <Select
                    value={skill.category || ''}
                    onValueChange={(value) => {
                      handleUpdateSkill(index, 'category', value);
                    }}
                    >
                    <SelectTrigger id={`skill-category-${index}`}>
                      <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                <div>
                  <Label htmlFor={`skill-description-${index}`}>Description (Optional)</Label>
                    <Input
                    id={`skill-description-${index}`}
                    value={skill.description || ''}
                    onChange={(e) => {
                      e.preventDefault();
                      handleUpdateSkill(index, 'description', e.target.value);
                    }}
                    placeholder="Brief description of your expertise in this skill"
                    />
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => handleRemoveSkill(index)}
              >
                Remove
              </Button>
            </div>
          ))}

            <Button
            onClick={handleAddNewSkill}
              variant="outline"
            className="w-full"
          >
              Add Skill
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}; 