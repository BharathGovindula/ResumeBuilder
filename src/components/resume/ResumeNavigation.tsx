import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';

interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const sections: Section[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'preview', label: 'Preview' },
  { id: 'settings', label: 'Settings' }
];

interface ResumeNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

export const ResumeNavigation: React.FC<ResumeNavigationProps> = ({
  activeSection,
  onSectionChange,
  className
}) => {
  return (
    <Card className={cn("p-4", className)}>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="space-y-2">
          {sections.map((section) => (
            <Button
                key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeSection === section.id && "bg-primary text-primary-foreground"
              )}
                onClick={() => onSectionChange(section.id)}
              >
              {section.icon && <span className="mr-2">{section.icon}</span>}
              {section.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </Card>
  );
}; 