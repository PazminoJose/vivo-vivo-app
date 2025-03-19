import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo invalido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña es muy corta" })
    .refine(
      (value) => {
        return value.trim().length > 0;
      },
      { message: "La contraseña es obligatoria" }
    )
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginInitialValues: LoginSchema = {
  email: "",
  password: ""
};
