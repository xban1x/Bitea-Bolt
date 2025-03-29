import React from 'react';
import { useTextField } from '@react-aria/textfield';
import { FormField, useFormField } from './FormField';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, description, className = '', ...props }, ref) => {
    const { getFieldClasses } = useFormField();

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...props,
        label,
        description,
        errorMessage: error,
        validationState: error ? 'invalid' : 'valid',
        inputElementType: 'textarea',
      },
      ref as any
    );

    return (
      <FormField label={label} error={error} description={description}>
        <textarea
          {...inputProps}
          ref={ref}
          rows={4}
          className={getFieldClasses(error, `resize-y min-h-[120px] ${className}`)}
        />
      </FormField>
    );
  }
);

TextArea.displayName = 'TextArea';