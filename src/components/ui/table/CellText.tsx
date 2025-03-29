import clsx from "clsx";
import { FC } from "react";

import { Typography } from "@/components/ui/text/Typography/Typography";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CellText: FC<Props> = ({ children, style, className }) => (
  <Typography
    variant="default"
    size="label-2"
    as="span"
    className={clsx("overflow-hidden text-ellipsis text-text-default-secondary", className)}
    style={style}
  >
    {children}
  </Typography>
);

export default CellText;
