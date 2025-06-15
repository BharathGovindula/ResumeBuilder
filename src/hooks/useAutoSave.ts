import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { markAsSaved } from '../store/slices/resumeFormSlice';

export const useAutoSave = (saveFunction: () => Promise<void>, delay = 2000) => {
  const dispatch = useAppDispatch();
  const isDirty = useAppSelector((state) => state.resumeForm.isDirty);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isDirty) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          await saveFunction();
          dispatch(markAsSaved());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDirty, saveFunction, delay, dispatch]);
}; 