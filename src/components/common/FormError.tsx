import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useAppSelector } from '@/store/hooks';

interface FormErrorProps {
  field?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ field }) => {
  const formErrors = useAppSelector((state) => state.resumeForm.formErrors);
  const saveError = useAppSelector((state) => state.resumeForm.saveError);

  if (field && formErrors?.[field]?.length > 0) {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        {formErrors[field].map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </Alert>
    );
  }

  if (saveError) {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        <AlertTitle>Save Error</AlertTitle>
        {saveError}
      </Alert>
    );
  }

  return null;
}; 