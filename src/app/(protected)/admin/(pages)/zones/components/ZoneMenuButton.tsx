import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@mantine/core";

interface ZoneMenuButtonProps extends ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
export default function ZoneMenuButton({ className, children, onClick, ...props }: ZoneMenuButtonProps) {
  return (
    <Button
      {...props}
      onClick={onClick}
      className={cn("hover:bg-primary-300 flex justify-start bg-transparent text-black", className)}
    >
      {children}
    </Button>
  );
}
