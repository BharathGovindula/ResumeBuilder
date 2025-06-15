import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useResumeForm } from '../../hooks/useResumeForm';
import type { PersonalInfo } from '../../types/resume';

export const PersonalInfoSection: React.FC = () => {
  const { resumeData, updatePersonalInfoField } = useResumeForm();
  const personalInfo = resumeData.personalInfo;

  const handleInputChange = (field: keyof PersonalInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updatePersonalInfoField(field, e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={handleInputChange('fullName')}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={handleInputChange('email')}
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={handleInputChange('location')}
              placeholder="City, Country"
            />
          </div>

          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Input
              id="summary"
              value={personalInfo.summary}
              onChange={handleInputChange('summary')}
              placeholder="A brief summary of your professional background and career goals"
            />
          </div>

          <div>
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              value={personalInfo.website || ''}
              onChange={handleInputChange('website')}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              type="url"
              value={personalInfo.linkedin || ''}
              onChange={handleInputChange('linkedin')}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub (Optional)</Label>
            <Input
              id="github"
              type="url"
              value={personalInfo.github || ''}
              onChange={handleInputChange('github')}
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 