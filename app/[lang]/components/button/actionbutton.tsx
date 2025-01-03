import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  variant: "edit" | "view" | "delete";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  onClick,
  disabled = false,
}) => {
  let icon = null;

  switch (variant) {
    case "edit":
      icon = "heroicons:pencil";
      break;
    case "view":
      icon = "heroicons:eye";
      break;
    case "delete":
      icon = "heroicons:trash";
      break;
    default:
      throw new Error("Invalid variant type");
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className="h-7 w-7"
      color="secondary"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} className="h-4 w-4" />
    </Button>
  );
};

export default ActionButton;
