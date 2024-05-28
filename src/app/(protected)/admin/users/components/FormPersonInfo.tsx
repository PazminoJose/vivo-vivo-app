import DataSelect from "@/components/DataSelect";
import { Checkbox, NumberInput, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { registerInitialValues, useRegisterFormContext } from "../context/registerFormContext";
import { useGetDisabilities } from "../hooks/useGetDisabilities.hook";
import { useGetEthnics } from "../hooks/useGetEthnics.hook";
import { useGetGenders } from "../hooks/useGetGenders.hook";
import { useGetMaritalStatus } from "../hooks/useGetMaritalStatus.hook";

export default function FormPersonInfo() {
  const form = useRegisterFormContext();

  const { data: genders } = useGetGenders();
  const { data: ethnics } = useGetEthnics();
  const { data: maritalStatus } = useGetMaritalStatus();
  const { data: disabilities } = useGetDisabilities();

  useEffect(() => {
    const hasDisability = form.values.hasDisability;
    if (!hasDisability) {
      form.setFieldValue("personDisability", registerInitialValues.personDisability);
    }
  }, [form.values.hasDisability]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <TextInput
        className="col-span-2"
        label="Dirección"
        placeholder="Dirección"
        {...form.getInputProps("personInfo.address")}
      />
      <TextInput label="Teléfono" placeholder="Teléfono" {...form.getInputProps("personInfo.phone")} />
      <DataSelect
        label="Género"
        placeholder="Seleccione un genero"
        data={genders ?? []}
        accessorLabel="name"
        accessorValue="id"
        {...form.getInputProps("personInfo.genderID")}
      />
      <DataSelect
        label="Etnia"
        placeholder="Seleccione una etnia"
        data={ethnics ?? []}
        accessorLabel="name"
        accessorValue="id"
        {...form.getInputProps("personInfo.ethnicID")}
      />
      <DataSelect
        label="Estado Civil"
        placeholder="Seleccione un estado civil"
        data={maritalStatus ?? []}
        accessorLabel="name"
        accessorValue="id"
        {...form.getInputProps("personInfo.maritalStatusID")}
      />
      <div className="col-span-2 flex flex-col">
        <Checkbox
          label="Tiene discapacidad"
          {...form.getInputProps("hasDisability", { type: "checkbox" })}
        />
        {form.values.hasDisability && (
          <div className="gpa-5 grid grid-cols-2 gap-5">
            <DataSelect
              label="Discapacidad"
              placeholder="Seleccione una discapacidad"
              data={disabilities ?? []}
              accessorLabel="name"
              accessorValue="id"
              {...form.getInputProps("personDisability.disabilityID")}
            />
            <NumberInput
              label="Porcentaje de discapacidad"
              placeholder="Porcentaje de discapacidad"
              {...form.getInputProps("personDisability.percentage")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
