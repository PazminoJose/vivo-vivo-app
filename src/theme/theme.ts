import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  ColorInput,
  FileInput,
  Modal,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  TextInput,
  createTheme
} from "@mantine/core";
import classes from "./Theme.module.css";

import { cn } from "@/lib/utils";
import { DateInput } from "@mantine/dates";

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
      "#030712"
    ]
  },
  breakpoints: {
    xs: "36em",
    sm: "40em",
    md: "48em",
    lg: "64em",
    xl: "80em"
  },
  components: {
    Button: Button.extend({
      classNames: {
        root: classes.button
      }
    }),
    TextInput: TextInput.extend({
      classNames: {
        label: "text-primary-600 font-bold",
        input: cn(
          "rounded-md border-2 border-primary-900 placeholder:text-primary-500",
          classes.hasError
        )
      }
    }),
    PasswordInput: PasswordInput.extend({
      classNames: {
        label: "text-primary-600 font-bold",
        input: cn(
          "rounded-md border-2 border-primary-900 placeholder:text-primary-500",
          classes.hasError
        )
      }
    }),
    ActionIcon: ActionIcon.extend({
      classNames: {
        root: classes.actionIcon
      }
    }),
    DateInput: DateInput.extend({
      classNames: {
        input: cn(
          "rounded-md border-2 border-primary-900 placeholder:text-primary-500",
          classes.hasError
        ),
        label: "text-secondary-600 font-bold"
      }
    }),
    Checkbox: Checkbox.extend({
      classNames: {
        input: "checked:bg-primary-900"
      }
    }),
    ColorInput: ColorInput.extend({
      classNames: {
        input: "border-primary-900 border-2 rounded-md"
      }
    }),
    NumberInput: NumberInput.extend({
      classNames: {
        input: "border-primary-900 border-2 rounded-md",
        label: "text-primary-600 font-bold"
      }
    }),
    FileInput: FileInput.extend({
      classNames: {
        input: "border-primary-900 placeholder:text-primary-500 rounded-md border-2"
      }
    }),
    Select: Select.extend({
      classNames: {
        input: cn(
          "rounded-md border-2 border-primary-900 placeholder:text-primary-500",
          classes.hasError
        )
      }
    }),
    RadioGroup: Radio.Group.extend({
      classNames: {
        label: "text-primary-600 font-bold"
      }
    }),
    Radio: Radio.extend({
      classNames: {
        label: "pl-1 text-primary-600 font-bold"
      }
    }),
    Card: Card.extend({
      classNames: {
        root: "rounded-lg"
      }
    }),
    Modal: Modal.extend({
      classNames: {
        body: "bg-primary-300",
        root: "bg-primary-300",
        content: "bg-primary-300",
        header: "bg-primary-300"
      }
    })
  }
});
