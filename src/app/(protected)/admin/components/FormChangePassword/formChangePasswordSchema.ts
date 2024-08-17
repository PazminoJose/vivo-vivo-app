import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, { message: "La contraseña es muy corta" }),
    newPassword: z.string().min(6, { message: "La contraseña es muy corta" }),
    confirmPassword: z.string().min(6, { message: "La contraseña es muy corta" })
  })
  .refine((schema) => schema.newPassword === schema.confirmPassword, {
    message: "La nueva contraseña y la confirmación deben coincidir",
    path: ["confirmPassword"]
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const changePasswordInitialValues: ChangePasswordSchema = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
};
