import { Typography } from "@/components/ui/text/Typography/Typography";
import { roleColorMap } from "@/data/employeeRoles/employeeRoles.utils";

const Chip = ({ value, color }: { value: string; color: string }) => {
  const styles = roleColorMap(color.toLowerCase());
  return (
    <Typography
      variant="default"
      size="label-2"
      as="span"
      style={styles}
      className="flex items-center justify-center gap-px rounded-xs px-1-5 py-0 capitalize"
    >
      {value}
    </Typography>
  );
};

export default Chip;
