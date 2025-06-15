import React, { useState, useCallback, memo, useRef } from 'react';
import type { ResumeData } from '../../types/resume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { VibrantTemplate } from '../templates/VibrantTemplate';
import type { TemplateType } from '../../types/template';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';
import { Slider } from '../ui/slider';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-hot-toast';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  sectionOrder: string[];
}

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  vibrant: VibrantTemplate,
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1;

export const ResumePreview: React.FC<ResumePreviewProps> = memo(({ data, template, sectionOrder }) => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!data) return null;

  const TemplateComponent = templates[template] || ModernTemplate;

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setStartX(e.clientX - translateX);
      setStartY(e.clientY - translateY);
      e.preventDefault();
    }
  }, [zoom, translateX, translateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const newTranslateX = e.clientX - startX;
      const newTranslateY = e.clientY - startY;
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
      e.preventDefault();
    }
  }, [isDragging, zoom, startX, startY]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomChange = useCallback(([value]: number[]) => {
    setZoom(value);
  }, []);

  const handleExportPDF = useCallback(async () => {
    if (!resumeRef.current) return;

    try {
      setIsExporting(true);
      const element = resumeRef.current;
      const filename = `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;

      // Store current transform
      const currentTransform = element.style.transform;
      const currentTransition = element.style.transition;

      // Reset transform for PDF generation
      element.style.transform = 'none';
      element.style.transition = 'none';

      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();

      // Restore transform
      element.style.transform = currentTransform;
      element.style.transition = currentTransition;

      toast.success('Resume exported successfully!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export resume');
    } finally {
      setIsExporting(false);
    }
  }, [data.personalInfo.fullName]);

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg h-[calc(100vh-4rem)]">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="hover:bg-gray-100"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
          <Slider
            value={[zoom]}
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={ZOOM_STEP}
            onValueChange={handleZoomChange}
            className="w-24"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="hover:bg-gray-100"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          disabled={zoom === DEFAULT_ZOOM && translateX === 0 && translateY === 0}
          className="hover:bg-gray-100"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="hover:bg-gray-100"
          title="Export as PDF"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="absolute inset-0 overflow-auto bg-white rounded-lg shadow-lg"
        style={{
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={resumeRef}
          className="min-w-[210mm] min-h-[297mm] p-8"
          style={{
            transform: `scale(${zoom}) translate(${translateX}px, ${translateY}px)`,
            transformOrigin: 'center top',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <TemplateComponent resume={data} sectionOrder={sectionOrder} />
        </div>
      </div>
    </div>
  );
}); 