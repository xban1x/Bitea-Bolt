import React from 'react';
import { useSelect, useButton } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { ChevronDown } from 'lucide-react';
import { FormField, useFormField } from './FormField';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, error, options, placeholder, value, onChange, className = '' }, ref) => {
    const { getFieldClasses } = useFormField();
    
    const items = React.useMemo(
      () => options.map(option => ({ id: option.value, name: option.label })),
      [options]
    );

    const state = useSelectState({
      label,
      items,
      selectedKey: value,
      onSelectionChange: key => onChange?.(key as string),
    });

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
      {
        label,
        errorMessage: error,
      },
      state,
      buttonRef
    );

    const { buttonProps } = useButton(triggerProps, buttonRef);

    return (
      <FormField label={label} error={error}>
        <div className="relative">
          <button
            {...buttonProps}
            ref={buttonRef}
            className={getFieldClasses(error, `relative text-left bg-white ${className}`)}
          >
            <span {...valueProps} className={!state.selectedItem ? 'text-gray-500' : 'text-gray-900'}>
              {state.selectedItem
                ? state.selectedItem.name
                : placeholder || 'Select an option'}
            </span>
            <ChevronDown 
              className={`
                absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 
                text-gray-400 transition-transform duration-200
                ${state.isOpen ? 'transform rotate-180' : ''}
              `} 
            />
          </button>
        </div>
      </FormField>
    );
  }
);

Select.displayName = 'Select';