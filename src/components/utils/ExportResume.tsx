import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { generatePDF, getDefaultFilename } from '../../services/pdfService';
import type { ResumeData } from '../../types/resume';
import { toast } from 'react-hot-toast';
import { FileDown } from 'lucide-react';
import { PDFPreview } from '../resume/PDFPreview';

interface ExportResumeProps {
  data: ResumeData;
  template: string;
  sectionOrder: string[];
}

export const ExportResume: React.FC<ExportResumeProps> = ({ data, template, sectionOrder }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) {
      toast.error('Preview element not found');
      return;
    }

    setIsGenerating(true);
    try {
      await generatePDF(previewRef.current, {
        filename: getDefaultFilename(data),
        format: 'a4',
        orientation: 'portrait',
        margin: 10,
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
      });
      toast.success('PDF generated successfully');
    } catch (error) {
      toast.error('Failed to generate PDF');
      console.error('PDF generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="hidden">
        <div ref={previewRef}>
          <PDFPreview data={data} template={template} sectionOrder={sectionOrder} />
        </div>
      </div>
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={handleExport}
        disabled={isGenerating}
      >
        <FileDown className="h-4 w-4" />
        {isGenerating ? 'Generating PDF...' : 'Export PDF'}
      </Button>
    </>
  );
}; 