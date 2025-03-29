import React from 'react';
import { useDateField, useDateSegment } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { createCalendar } from '@internationalized/date';
import { useDateFieldState } from '@react-stately/datepicker';

interface DatePickerProps {
  label?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ label, error, value, onChange, className = '' }, ref) => {
    const { locale } = useLocale();
    const calendar = createCalendar(locale);
    
    const state = useDateFieldState({
      value: value ? calendar.fromDate(value) : undefined,
      onChange: date => onChange?.(date.toDate(locale)),
    });

    const { fieldProps, segments } = useDateField(state, { ...ref });

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-base font-medium text-gray-900 mb-1">
            {label}
          </label>
        )}
        <div
          {...fieldProps}
          className={`
            flex gap-1 w-full px-4 py-3 text-base
            rounded-xl border border-gray-200
            transition-colors duration-200
            focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400
            ${error ? 'border-red-300 focus-within:ring-red-100 focus-within:border-red-400' : ''}
            ${className}
          `}
        >
          {segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

function DateSegment({ segment, state }) {
  const ref = React.useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`
        px-0.5 tabular-nums text-base outline-none rounded
        focus:bg-blue-500 focus:text-white
        ${!segment.isEditable ? 'text-gray-400' : 'text-gray-900'}
      `}
    >
      {segment.text}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';