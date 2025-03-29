import clsx from "clsx";
import { useMemo } from "react";
import { Disclosure, DisclosureGroup, DisclosurePanel, Heading, Button as AriaButton } from "react-aria-components";
import { Control, Controller } from "react-hook-form";

import { ChevronDownIcon } from "@/assets/icons/general/ChevronDown";
import { Toggle } from "@/components/ui/inputs/Toggle/Toggle";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { EmployeePermissionsModels } from "@/data/employeePermissions/employeePermissions.models";
import { EmployeeRolesModels } from "@/data/employeeRoles/employeeRoles.models";
import { toNormalCase } from "@/util/case.utils";

interface PermissionAccordionProps {
  permissionsData: EmployeePermissionsModels.EmployeePermissionResponse[];
  control: Control<EmployeeRolesModels.EmployeeRoleCreateRequest>;
  onToggle?: ({ permission, toggled }: { permission: string; toggled: boolean }) => void;
}

const PermissionsAccordion = ({ permissionsData, control, onToggle }: PermissionAccordionProps) => {
  const groupedPermissions = useMemo(() => {
    return Object.entries(
      permissionsData.reduce(
        (acc, permission) => {
          if (!acc[permission.group]) {
            acc[permission.group] = [];
          }
          acc[permission.group].push(permission);
          return acc;
        },
        {} as Record<string, EmployeePermissionsModels.EmployeePermissionResponse[]>,
      ),
    ).map(([group, permissions]) => ({
      group,
      permissions,
    }));
  }, [permissionsData]);

  return (
    <DisclosureGroup defaultExpandedKeys={groupedPermissions.map(({ group }) => group)} allowsMultipleExpanded>
      {groupedPermissions.map(({ group, permissions }) => (
        <Disclosure key={group} id={group}>
          {({ isExpanded }) => (
            <>
              <Heading>
                <AriaButton
                  slot="trigger"
                  className="flex w-full items-center justify-between border-b border-solid border-b-elevation-outline-1 bg-elevation-surface-1 focus:outline-none"
                >
                  <Typography
                    variant="default"
                    size="label-1"
                    className="px-4 py-1-5 font-primary text-text-default-secondary"
                  >
                    {toNormalCase(group)}
                  </Typography>
                  <div className="flex w-[80px] justify-center px-1 py-0">
                    <ChevronDownIcon
                      width={24}
                      height={24}
                      className={clsx("transition-transform focus:!outline-none", isExpanded && "rotate-180")}
                    />
                  </div>
                </AriaButton>
              </Heading>
              <DisclosurePanel>
                {permissions?.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between border-b border-solid border-b-elevation-outline-1 px-3 py-1-5"
                  >
                    <Typography
                      variant="prominent-1"
                      size="body-4"
                      as="p"
                      className="py-0-5 text-text-default-secondary"
                    >
                      {permission.description}
                    </Typography>
                    <Controller
                      control={control}
                      name="permissions"
                      render={({ field: { value, onChange, disabled } }) => (
                        <Toggle
                          value={permission.id}
                          isSelected={value.includes(permission.id)}
                          onChange={(isSelected) => {
                            onToggle?.({ permission: permission.id, toggled: isSelected });
                            if (isSelected) {
                              onChange([...value, permission.id]);
                            } else {
                              onChange(value.filter((id) => id !== permission.id));
                            }
                          }}
                          isDisabled={disabled}
                        />
                      )}
                    />
                  </div>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
};

export default PermissionsAccordion;
