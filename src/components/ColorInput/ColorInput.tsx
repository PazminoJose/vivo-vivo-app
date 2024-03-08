import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";
import styles from "./ColorInput.module.css";

export const ColorInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(function PolygonComponent(
  { className, ...props },
  ref
) {
  return <input type="color" className={cn(styles["color-input"], className)} {...props} ref={ref} />;
});
