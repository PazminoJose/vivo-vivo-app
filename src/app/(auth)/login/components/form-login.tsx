"use client";
import { Button, Card, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Correo invalido" }),
  password: z.string().min(8, { message: "La contraseña es muy corta" })
});

type LoginSchema = z.infer<typeof loginSchema>;

const initialValues: LoginSchema = {
  email: "",
  password: ""
};

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues
  });

  const handleSubmit = async (values: LoginSchema) => {
    const { email, password } = values;
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false
    });
    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/admin/heat-map");
      toast.success("Bienvenido");
    }
    setLoading(false);
  };

  return (
    <Card className="w-full rounded-xl p-5  shadow-md shadow-slate-400 sm:shadow-none" withBorder>
      <form className="flex flex-col gap-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          classNames={{ input: "border-gray-900 placeholder:text-gray-500" }}
          withAsterisk
          label="Correo"
          placeholder="ejemplo@ejemplo.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          classNames={{ input: "border-gray-900 placeholder:text-gray-500" }}
          withAsterisk
          label="Contraseña"
          placeholder="*********"
          {...form.getInputProps("password")}
        />
        <Button className="bg-gray-900 p-2 uppercase" type="submit" loading={loading} fullWidth>
          Ingresar
        </Button>
      </form>
    </Card>
  );
}
