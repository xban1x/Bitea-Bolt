import { Ref, useState } from "react";

import { Tooltip } from "./Tooltip";

type TooltipEllipsisProps = {
  text: string;
  children: (ref: Ref<HTMLHeadingElement> | undefined) => JSX.Element;
};

export const TooltipEllipsis = ({ text, children }: TooltipEllipsisProps) => {
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const onContentRef = (ref: HTMLElement | null) => {
    if (ref) {
      setIsEllipsisActive(ref.offsetWidth < ref.scrollWidth);
    }
  };

  const content = children(onContentRef);

  if (isEllipsisActive) {
    return (
      <Tooltip text={text} placement="bottom">
        {content}
      </Tooltip>
    );
  }

  return content;
};
