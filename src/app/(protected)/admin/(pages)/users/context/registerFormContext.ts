import { phoneRegex } from "@/lib/utils/phoneRegex";
import { validateEcuadorianIdCard } from "@/lib/utils/validate-ecuadorian-id-card.util";
import { createFormContext } from "@mantine/form";
import { z } from "zod";

export const registerSchema = z
  .object({
    user: z.object({
      userID: z.number().optional(),
      email: z.string().email("El correo electrónico no es válido"),
      password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
      isAcceptedTerms: z.number()
    }),
    person: z.object({
      personID: z.number().optional(),
      firstName: z.string().min(2, "El nombre es muy corto"),
      middleName: z.string().min(2, "El segundo nombre es muy corto"),
      lastNames: z.string().min(2, "Los apellidos son muy cortos"),
      dni: z.string().refine((dni) => validateEcuadorianIdCard(dni), "Debe ser una cédula válida"),
      avatar: z
        .instanceof(File)
        .nullable()
        .refine((file) => file != null, "La imagen es requerida")
    }),
    personInfo: z.object({
      personID: z.number().optional(),
      phone: z.string().regex(phoneRegex, "Número de teléfono inválido"),
      birthDate: z.date(),
      address: z.string(),
      genderID: z.number(),
      ethnicID: z.number(),
      maritalStatusID: z.number()
    }),
    roleID: z.coerce.number().refine((roleID) => roleID > 0, "El rol es requerido"),
    hasDisability: z.boolean(),
    personDisability: z
      .object({
        personDisabilityID: z.number().optional(),
        personID: z.number().optional(),
        disabilityID: z.number(),
        percentage: z.number().optional()
      })
      .optional()
  })
  .superRefine(({ hasDisability, personDisability }, ctx) => {
    if (hasDisability && personDisability?.disabilityID === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La discapacidad es requerida",
        path: ["personDisability.disabilityID"]
      });
    }
  });

export const registerInitialValues: RegisterSchema = {
  user: {
    email: "",
    password: "",
    isAcceptedTerms: 1
  },
  person: {
    firstName: "",
    middleName: "",
    lastNames: "",
    dni: "",
    avatar: null
  },
  personInfo: {
    phone: "",
    birthDate: new Date(),
    address: "",
    genderID: 0,
    ethnicID: 0,
    maritalStatusID: 0
  },
  roleID: 0,
  hasDisability: false,
  personDisability: {
    disabilityID: 0
  }
};

export type RegisterSchema = z.infer<typeof registerSchema>;

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] =
  createFormContext<RegisterSchema>();
