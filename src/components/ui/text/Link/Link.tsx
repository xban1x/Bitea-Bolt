import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { PropsWithChildren } from "react";

import { uiOutlineClass } from "@/components/ui/global/outline";

type LinkProps = PropsWithChildren<NextLinkProps> & {
  className?: string;
  id?: string;
  target?: string;
  rel?: string;
};

export const Link = (props: LinkProps) => {
  if (props.id) {
    return <NextLink {...props} className={`${uiOutlineClass} ${props.className}`} id={props.id} />;
  }

  return <NextLink {...props} className={`${uiOutlineClass} ${props.className}`} />;
};
