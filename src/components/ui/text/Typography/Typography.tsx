import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export const typography = cva("", {
  variants: {
    size: {
      "headline-1": ["t:text-desktop-headline-1"],
      "title-1": ["t:text-desktop-title-1"],
      "title-2": ["t:text-desktop-title-2"],
      "title-3": ["t:text-desktop-title-3"],
      "title-4": ["t:text-desktop-title-4"],
      "title-5": ["t:text-desktop-title-5"],
      "title-6": ["t:text-desktop-title-6"],
      "body-1": ["t:text-desktop-body-1"],
      "body-2": ["t:text-desktop-body-2"],
      "body-3": ["t:text-desktop-body-3"],
      "body-4": ["t:text-desktop-body-4"],
      "label-1": [],
      "label-2": [],
      "label-3": [],
      "label-4": [],
      "button-1": [],
      "button-2": [],
      "button-3": [],
      "input-text": [],
      "input-label": [],
      "input-helper": [],
      "input-error": [],
    },
    sizeMobile: {
      "headline-1": ["text-mobile-headline-1"],
      "title-1": ["text-mobile-title-1"],
      "title-2": ["text-mobile-title-2"],
      "title-3": ["text-mobile-title-3"],
      "title-4": ["text-mobile-title-4"],
      "title-5": ["text-mobile-title-5"],
      "title-6": ["text-mobile-title-6"],
      "body-1": ["text-mobile-body-1"],
      "body-2": ["text-mobile-body-2"],
      "body-3": ["text-mobile-body-3"],
      "body-4": ["text-mobile-body-4"],
      "label-1": ["text-default-label-1"],
      "label-2": ["text-default-label-2"],
      "label-3": ["text-default-label-3"],
      "label-4": ["text-default-label-4"],
      "button-1": ["text-button-label-1"],
      "button-2": ["text-button-label-2"],
      "button-3": ["text-button-label-3"],
      "input-text": ["text-input-text"],
      "input-label": ["text-input-label"],
      "input-helper": ["text-input-helper"],
      "input-error": ["text-input-error"],
    },
    variant: {
      default: [],
      "default-italic": ["italic"],
      "prominent-1": [],
      "prominent-1-italic": ["italic"],
      "prominent-2": [],
      "prominent-2-italic": ["italic"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
  compoundVariants: [
    {
      size: ["headline-1", "title-1", "title-2", "title-3", "title-4", "title-5"],
      variant: "default",
      className: "font-headings-default",
    },
    {
      size: ["headline-1", "title-1", "title-2", "title-3", "title-4", "title-5", "title-6"],
      variant: "prominent-1",
      className: "font-headings-prominent-1",
    },
    {
      size: ["headline-1", "title-1", "title-2", "title-3", "title-4", "title-5", "title-6"],
      className: "font-primary",
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: "prominent-1",
      className: "font-body-prominent-1",
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: "prominent-1-italic",
      className: "font-body-prominent-1",
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: "prominent-2",
      className: "font-body-prominent-2",
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      variant: "prominent-2-italic",
      className: "font-body-prominent-2",
    },
    {
      size: ["body-1", "body-2", "body-3", "body-4"],
      className: "font-primary",
    },
    {
      size: [
        "label-1",
        "label-2",
        "label-3",
        "label-4",
        "button-1",
        "button-2",
        "button-3",
        "input-text",
        "input-label",
        "input-helper",
        "input-error",
      ],
      variant: "default",
      className: "font-labels-default",
    },
    {
      size: [
        "label-1",
        "label-2",
        "label-3",
        "label-4",
        "button-1",
        "button-2",
        "button-3",
        "input-text",
        "input-label",
        "input-helper",
        "input-error",
      ],
      variant: "prominent-1",
      className: "font-labels-prominent-1",
    },
    {
      size: [
        "label-1",
        "label-2",
        "label-3",
        "label-4",
        "button-1",
        "button-2",
        "button-3",
        "input-text",
        "input-label",
        "input-helper",
        "input-error",
      ],
      className: "font-primary",
    },
  ],
});

type TypographyVariantProps = VariantProps<typeof typography>;

interface TypographyPropsCva
  extends Omit<TypographyVariantProps, "size">,
    Required<Pick<TypographyVariantProps, "size">> {}

type TypographyProps = {
  as?: TypographyTag;
} & TypographyPropsCva &
  React.HTMLAttributes<HTMLElement>;

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as = "p", size, sizeMobile, variant, className, ...props }: TypographyProps, ref) => {
    const Tag = as;

    return (
      <Tag
        ref={ref}
        className={typography({
          size,
          sizeMobile: sizeMobile ?? size,
          variant,
          className,
        })}
        {...props}
      />
    );
  },
);
