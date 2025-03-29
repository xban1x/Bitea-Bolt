import clsx from "clsx";
import React, { useState } from "react";

import { Typography } from "@/components/ui/text/Typography/Typography";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface Props {
  onClick: () => void;
  isActive: boolean;
  text: string;
  numberIndicator?: number;
  icon?: React.ReactNode;
}

const TableFilterButton = ({ onClick, isActive, text, numberIndicator, icon }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const isDesktop = useBreakpoint("t");

  if (!isDesktop) {
    return (
      <button
        className={`mb-2 mr-2 rounded-xs px-1 ${isActive ? "border border-interactive-outlined-hover text-interactive-outlined-hover" : "border border-interactive-outlined-on text-interactive-outlined-on"} ${isActive && isHover ? "bg-elevation-blue-surface-1 text-interactive-outlined-hover" : ""} ${!isActive && isHover ? "bg-elevation-surface-1 text-interactive-outlined-on" : ""}`}
        type="button"
        onClick={() => onClick()}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex items-center">
          <Typography
            variant="default"
            as="div"
            size="label-2"
            className="flex w-full items-center gap-1 rounded-[4px] px-2"
          >
            {text}

            {icon}

            {numberIndicator && (
              <div
                className={`ml-1 rounded-xs ${isActive || isHover ? "bg-elevation-blue-surface-1 text-interactive-outlined-hover" : "bg-elevation-surface-1"} ${!isActive && isHover ? "bg-elevation-surface-1 text-interactive-outlined-on" : ""} px-1 py-[2px]`}
              >
                <Typography
                  size="label-4"
                  className={`${isActive || (isHover && isActive) ? "text-interactive-outlined-hover" : "text-interactive-outlined-on"} font-primary`}
                >
                  {numberIndicator}
                </Typography>
              </div>
            )}
          </Typography>
        </div>
      </button>
    );
  }

  return (
    <button
      className={clsx(
        "h-[36px] flex-shrink-0 border-b-[1px] px-1 py-[6px]",
        isActive
          ? "border-b-[2px] border-interactive-outlined-hover text-interactive-outlined-hover"
          : "border-transparent text-interactive-outlined-on",
      )}
      type="button"
      onClick={() => onClick()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center">
        <Typography
          variant="default"
          as="div"
          size="label-2"
          className={clsx(
            "flex w-full items-center gap-1 rounded-[4px] px-2",
            isActive && isHover ? "bg-elevation-blue-surface-1 text-interactive-outlined-hover" : "",
            !isActive && isHover ? "bg-elevation-surface-1 text-interactive-outlined-on" : "",
          )}
        >
          <span className="flex-shrink-0">{text}</span>

          <span>{icon}</span>

          {numberIndicator && (
            <div
              className={clsx(
                "ml-1 rounded-xs px-1 py-[2px]",
                isActive || isHover
                  ? "bg-elevation-blue-surface-1 text-interactive-outlined-hover"
                  : "bg-elevation-surface-1",
                !isActive && isHover ? "bg-elevation-surface-1 text-interactive-outlined-on" : "",
              )}
            >
              <Typography
                size="label-4"
                className={clsx(
                  "font-primary",
                  isActive || (isHover && isActive)
                    ? "text-interactive-outlined-hover"
                    : "text-interactive-outlined-on",
                )}
              >
                {numberIndicator}
              </Typography>
            </div>
          )}
        </Typography>
      </div>
    </button>
  );
};

export default TableFilterButton;
