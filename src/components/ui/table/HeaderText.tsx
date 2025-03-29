import { FC } from "react";

import { Typography } from "@/components/ui/text/Typography/Typography";

interface Props {
  children: React.ReactNode;
}

const HeaderText: FC<Props> = ({ children }) => (
  <Typography
    variant="default"
    size="label-2"
    as="span"
    className="overflow-hidden text-ellipsis text-interactive-tertiary-on"
  >
    {children}
  </Typography>
);

export default HeaderText;
