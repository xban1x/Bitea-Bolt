import { GroupDOMAttributes } from "@react-types/shared";
import { forwardRef } from "react";
import { TimeFieldState } from "react-stately";

import { DateSegmentItem } from "@/components/ui/inputs/DateTime/shared/DateSegmentItem";

interface TimeFieldProps {
  fieldProps: GroupDOMAttributes;
  state: TimeFieldState;
  isDisabled?: boolean;
}

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(({ fieldProps, state, isDisabled }, ref) => {
  return (
    <div>
      <div {...fieldProps} ref={ref} className="flex">
        {state.segments.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DateSegmentItem key={i} segment={segment} state={state} isDisabled={isDisabled} timePickerOnly />
        ))}
      </div>
    </div>
  );
});
