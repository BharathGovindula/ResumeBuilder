import React, { useState, useEffect } from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from '../templates/TemplateSelector';
import { useAuth } from '../../contexts/AuthContext';
import { saveResume, getResume } from '../../services/resumeService';
import { toast } from 'react-hot-toast';
import type { ResumeData, SectionType } from '../../types/resume';
import type { TemplateType } from '../../types/template';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileText, GripVertical, Save } from 'lucide-react';
import { Button } from '../ui/button';

// Define section configuration
const sections: { id: SectionType; component: React.ReactNode; title: string }[] = [
  { id: 'personalInfo', component: <PersonalInfoSection />, title: 'Personal Information' },
  { id: 'experience', component: <ExperienceSection />, title: 'Work Experience' },
  { id: 'education', component: <EducationSection />, title: 'Education' },
  { id: 'skills', component: <SkillsSection />, title: 'Skills' },
  { id: 'projects', component: <ProjectsSection />, title: 'Projects' },
  { id: 'certifications', component: <CertificationsSection />, title: 'Certifications' },
];

// Sortable section component
const SortableSection: React.FC<{
  id: SectionType;
  children: React.ReactNode;
  title: string;
}> = ({ id, children, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md transition-all duration-200 ${
        isDragging ? 'shadow-lg ring-2 ring-primary/20' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg cursor-move"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export const ResumeBuilder: React.FC = () => {
  const { resumeData, loadResumeData } = useResumeForm();
  const { currentUser } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isLoading, setIsLoading] = useState(true);
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>(sections.map(s => s.id));
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved resume data when component mounts
  useEffect(() => {
    const loadSavedResume = async () => {
      if (currentUser) {
        try {
          const savedResume = await getResume(currentUser.uid);
          if (savedResume) {
            loadResumeData(savedResume);
          }
        } catch (error) {
          console.error('Error loading resume:', error);
          toast.error('Failed to load resume data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadSavedResume();
  }, [currentUser, loadResumeData]);

  // Auto-save functionality
  useEffect(() => {
    if (!currentUser || !resumeData) return;

    const saveTimeout = setTimeout(async () => {
      try {
        setIsSaving(true);
        await saveResume(currentUser.uid, resumeData);
        toast.success('Resume saved automatically');
      } catch (error) {
        console.error('Error auto-saving resume:', error);
        toast.error('Failed to auto-save resume');
      } finally {
        setIsSaving(false);
      }
    }, 5000); // Auto-save after 5 seconds of inactivity

    return () => clearTimeout(saveTimeout);
  }, [resumeData, currentUser]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as SectionType);
        const newIndex = items.indexOf(over.id as SectionType);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-500">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center gap-4">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={isSaving}
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Saved'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sectionOrder}
                strategy={verticalListSortingStrategy}
              >
                {sectionOrder.map((sectionId) => {
                  const section = sections.find((s) => s.id === sectionId);
                  return (
                    <SortableSection
                      key={sectionId}
                      id={sectionId}
                      title={section?.title || ''}
                    >
                      {section?.component}
                    </SortableSection>
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>

          <div className="sticky top-24">
            <ResumePreview
              data={resumeData}
              template={selectedTemplate}
              sectionOrder={sectionOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 