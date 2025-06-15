import React from 'react';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';

interface ResumeLayoutProps {
  children: React.ReactNode;
  className?: string;
  showPreview?: boolean;
}

export const ResumeLayout: React.FC<ResumeLayoutProps> = ({ 
  children, 
  className,
  showPreview = false 
}) => {
  return (
    <div className={cn(
      "container mx-auto px-4 py-8",
      showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "max-w-4xl",
      className
    )}>
      <ScrollArea className={cn(
        "h-[calc(100vh-4rem)]",
        showPreview ? "lg:pr-4" : ""
      )}>
        <Card className="p-6">
          {children}
        </Card>
      </ScrollArea>
    </div>
  );
}; 