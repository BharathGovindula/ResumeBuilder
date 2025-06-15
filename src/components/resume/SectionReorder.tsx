import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../store/hooks';
import {
  reorderEducation,
  reorderSkills,
  reorderProjects,
} from '../../store/slices/resumeFormSlice';
import { Card, CardContent } from '../ui/card';
import { GripVertical, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

interface SectionReorderProps {
  type: 'education' | 'skills' | 'projects';
  items: Array<{ id: string; title: string }>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const SectionReorder: React.FC<SectionReorderProps> = ({ 
  type, 
  items,
  onEdit,
  onDelete,
  className 
}) => {
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const from = result.source.index;
    const to = result.destination.index;

    switch (type) {
      case 'education':
        dispatch(reorderEducation({ from, to }));
        break;
      case 'skills':
        dispatch(reorderSkills({ from, to }));
        break;
      case 'projects':
        dispatch(reorderProjects({ from, to }));
        break;
    }
  };

  const getSectionTitle = () => {
    switch (type) {
      case 'education':
        return 'Education Items';
      case 'skills':
        return 'Skills';
      case 'projects':
        return 'Projects';
      default:
        return 'Items';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">{getSectionTitle()}</h3>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={type}>
          {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
              {items.length === 0 ? (
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No items to reorder. Add some items first.
                  </CardContent>
                </Card>
              ) : (
                items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                        className={cn(
                          "bg-white transition-colors",
                          snapshot.isDragging && "bg-muted"
                        )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div
                        {...provided.dragHandleProps}
                            className="cursor-grab hover:text-primary transition-colors"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="flex-1 font-medium">{item.title}</span>
                          <div className="flex items-center gap-2">
                            {onEdit && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => onEdit(item.id)}
                                    >
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit item</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {onDelete && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => onDelete(item.id)}
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete item</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
                ))
              )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  );
}; 