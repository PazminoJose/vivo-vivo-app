import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo invalido" }),
  password: z.string().min(8, { message: "La contraseña es muy corta" })
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginInitialValues: LoginSchema = {
  email: "",
  password: ""
};
