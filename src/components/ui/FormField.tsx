import React from 'react';

interface FormFieldProps {
  label?: string;
  error?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-[17px] font-medium text-gray-900">
          {label}
        </label>
      )}
      {children}
      {description && (
        <div className="text-sm text-gray-500 mt-1">
          {description}
        </div>
      )}
      {error && (
        <div className="text-sm text-red-600 mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export const useFormField = () => {
  const baseFieldClasses = `
    block w-full px-[18px] py-[14px] text-[17px]
    rounded-[20px] border border-gray-300
    placeholder:text-gray-500
    transition-shadow duration-200
    focus:outline-none focus:border-gray-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]
    disabled:bg-gray-50 disabled:text-gray-500
  `;

  const getFieldClasses = (error?: string, additionalClasses: string = '') => `
    ${baseFieldClasses}
    ${error ? 'border-red-300 focus:shadow-[0_0_0_4px_rgba(255,0,0,0.05)]' : ''}
    ${additionalClasses}
  `;

  return { getFieldClasses };
};