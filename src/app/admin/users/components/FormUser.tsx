import DataSelect from "@/components/DataSelect";
import { Avatar, FileInput, TextInput } from "@mantine/core";
import { useRegisterFormContext } from "../context/registerFormContext";
import { useGetRoles } from "../hooks/userGetRoles.hook";

export default function FormUser() {
  const form = useRegisterFormContext();
  const { data: roles } = useGetRoles();

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-2">
        <Avatar
          src={form.values.person.avatar && URL.createObjectURL(form.values.person.avatar)}
          alt={form.values.person.firstName}
          className="mx-auto size-32"
        />
      </div>
      <TextInput
        type="email"
        label="Correo"
        placeholder="ejemplo@ejemplo.com"
        {...form.getInputProps("user.email")}
      />
      <TextInput
        disabled={Boolean(form.values.user.userID)}
        type="password"
        label="Contraseña"
        placeholder="********"
        {...form.getInputProps("user.password")}
      />
      <TextInput
        label="Primer Nombre"
        placeholder="PrimerNombre"
        {...form.getInputProps("person.firstName")}
      />
      <TextInput
        label="Segundo Nombre"
        placeholder="Segundo Nombre"
        {...form.getInputProps("person.middleName")}
      />
      <TextInput label="Apellidos" placeholder="Apellidos" {...form.getInputProps("person.lastNames")} />
      <TextInput label="Cédula" placeholder="Cédula" {...form.getInputProps("person.dni")} />
      <FileInput
        label="Avatar"
        placeholder="Seleccione una imagen"
        {...form.getInputProps("person.avatar")}
      />
      <DataSelect
        label="Rol"
        placeholder="Seleccione un rol"
        accessorLabel="roleName"
        accessorValue="roleID"
        data={roles ?? []}
        {...form.getInputProps("roleID")}
      />
    </div>
  );
}
