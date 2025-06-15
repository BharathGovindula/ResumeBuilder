import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useResumeForm } from '../../hooks/useResumeForm';
import { Textarea } from '../ui/textarea';
import { SectionReorder } from './SectionReorder';

export const CertificationsSection: React.FC = () => {
  const {
    resumeData,
    addNewCertification: handleAddCertification,
    removeCertificationEntry: handleRemoveCertification,
    updateCertificationField: handleUpdateCertification,
  } = useResumeForm();

  const certifications = resumeData.certifications || [];

  const handleArrayFieldChange = (index: number, field: string, value: string) => {
    const currentValue = certifications[index][field] || [];
    const newValue = [...currentValue, value];
    handleUpdateCertification(index, field, newValue);
  };

  const removeArrayItem = (index: number, field: string, itemIndex: number) => {
    const currentValue = certifications[index][field] || [];
    const newValue = currentValue.filter((_, i) => i !== itemIndex);
    handleUpdateCertification(index, field, newValue);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certifications.map((certification, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`certification-name-${index}`}>Certification Name</Label>
                    <Input
                      id={`certification-name-${index}`}
                      value={certification.name || ''}
                      onChange={(e) => handleUpdateCertification(index, 'name', e.target.value)}
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`certification-issuer-${index}`}>Issuing Organization</Label>
                    <Input
                      id={`certification-issuer-${index}`}
                      value={certification.issuer || ''}
                      onChange={(e) => handleUpdateCertification(index, 'issuer', e.target.value)}
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`certification-date-${index}`}>Date Earned</Label>
                    <Input
                      id={`certification-date-${index}`}
                      type="date"
                      value={certification.date || ''}
                      onChange={(e) => handleUpdateCertification(index, 'date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`certification-expiry-${index}`}>Expiry Date (if applicable)</Label>
                    <Input
                      id={`certification-expiry-${index}`}
                      type="date"
                      value={certification.expiryDate || ''}
                      onChange={(e) => handleUpdateCertification(index, 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`certification-id-${index}`}>Credential ID</Label>
                    <Input
                      id={`certification-id-${index}`}
                      value={certification.credentialId || ''}
                      onChange={(e) => handleUpdateCertification(index, 'credentialId', e.target.value)}
                      placeholder="e.g., AWS-123456"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`certification-url-${index}`}>Credential URL</Label>
                    <Input
                      id={`certification-url-${index}`}
                      type="url"
                      value={certification.credentialUrl || ''}
                      onChange={(e) => handleUpdateCertification(index, 'credentialUrl', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`certification-description-${index}`}>Description</Label>
                  <Textarea
                    id={`certification-description-${index}`}
                    value={certification.description || ''}
                    onChange={(e) => handleUpdateCertification(index, 'description', e.target.value)}
                    placeholder="Describe the certification and its significance..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {(certification.skills || []).map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-center gap-1 bg-secondary px-2 py-1 rounded"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeArrayItem(index, 'skills', skillIndex)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            handleArrayFieldChange(index, 'skills', input.value.trim());
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => handleRemoveCertification(index)}
                  className="w-full"
                >
                  Remove Certification
                </Button>
              </div>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={handleAddCertification}
            className="w-full"
          >
            Add Certification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 