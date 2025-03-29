import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { FormField, useFormField } from './FormField';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, description, className = '', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef || internalRef) as React.RefObject<HTMLInputElement>;
    const { getFieldClasses } = useFormField();

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...props,
        label,
        description,
        errorMessage: error,
        validationState: error ? 'invalid' : 'valid',
      },
      ref
    );

    return (
      <FormField label={label} error={error} description={description}>
        <input
          {...inputProps}
          ref={ref}
          className={getFieldClasses(error, className)}
        />
      </FormField>
    );
  }
);

Input.displayName = 'Input';