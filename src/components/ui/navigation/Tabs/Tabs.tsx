import clsx from "clsx";
import { Tabs as AriaTabs, TabList, Tab, TabPanel } from "react-aria-components";

import { Typography } from "@/components/ui/text/Typography/Typography";

export interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export function Tabs({ items }: TabsProps) {
  return (
    <AriaTabs className="w-full">
      <TabList className="flex items-center self-stretch border-b border-solid border-b-elevation-surface-2 pr-3">
        {items.map((item) => (
          <Tab
            key={item.id}
            id={item.id}
            className={({ isSelected }) =>
              clsx(
                "flex cursor-pointer items-center justify-center border-b-2 border-solid px-1 py-1-5 outline-none",
                isSelected
                  ? "border-b-interactive-primary-idle text-interactive-outlined-hover"
                  : "border-transparent text-interactive-tertiary-on",
              )
            }
          >
            <Typography variant="default" size="label-2" as="span" className="px-2">
              {item.title}
            </Typography>
          </Tab>
        ))}
      </TabList>
      {items.map((item) => (
        <TabPanel key={item.id} id={item.id} className="pt-4">
          {item.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}
