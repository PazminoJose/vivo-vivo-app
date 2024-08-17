import { Button, PasswordInput, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSession } from "next-auth/react";
import { usePatchChangePassword } from "../services/patchChangePassword.service";
import {
  changePasswordInitialValues,
  ChangePasswordSchema,
  changePasswordSchema
} from "./formChangePasswordSchema";

export default function FormChangePassword() {
  const { data: userData } = useSession();

  const form = useForm({
    validate: zodResolver(changePasswordSchema),
    initialValues: changePasswordInitialValues
  });

  const { mutate: changePasswordMutation, isPending } = usePatchChangePassword();

  const handleSubmit = (changePasswordSchema: ChangePasswordSchema) => {
    changePasswordMutation({
      changePasswordSchema,
      userID: userData?.user.userID ?? 0
    });
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={form.onSubmit(handleSubmit)}>
      <Text className="text-primary text-center text-lg font-bold uppercase">Cambiar contraseña</Text>
      <PasswordInput
        label="Contraseña Anterior"
        placeholder="******"
        {...form.getInputProps("oldPassword")}
      />
      <PasswordInput
        label="Nueva Contraseña"
        placeholder="******"
        {...form.getInputProps("newPassword")}
      />
      <PasswordInput
        classNames={{ input: "border-gray-800 border-2 rounded-md" }}
        label="Confirmar Contraseña"
        placeholder="******"
        {...form.getInputProps("confirmPassword")}
      />
      <Button type="submit" loading={isPending} className="bg-primary uppercase">
        Cambiar
      </Button>
    </form>
  );
}
