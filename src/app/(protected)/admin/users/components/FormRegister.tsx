"use client";
import { cn } from "@/lib/utils";
import { Button, Group, Stepper } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { IconCircleX } from "@tabler/icons-react";
import { useState } from "react";
import {
  RegisterFormProvider,
  RegisterSchema,
  registerInitialValues,
  registerSchema,
  useRegisterForm
} from "../context/registerFormContext";
import { usePostRegister } from "../hooks/usePostRegister.hook";
import { usePutRegister } from "../hooks/usePutRegister.hook";
import FormPersonInfo from "./FormPersonInfo";
import FormUser from "./FormUser";

interface FormRegisterProps {
  onSubmitSuccess?: () => void;
  initialValues?: RegisterSchema | null;
}

export default function FormRegister({ onSubmitSuccess, initialValues }: FormRegisterProps) {
  const [active, setActive] = useState(0);
  const [currentErrorStep, setCurrentErrorStep] = useState<number | null>(null);
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const form = useRegisterForm({
    initialValues: initialValues || registerInitialValues,
    validate: zodResolver(registerSchema)
  });

  const { mutate: createMutation, isPending: isPendingCreate } = usePostRegister({
    onSuccess: onSubmitSuccess
  });
  const { mutate: editMutation, isPending: isPendingEdite } = usePutRegister({
    onSuccess: onSubmitSuccess
  });

  const handleSubmit = (values: RegisterSchema) => {
    const { hasDisability } = values;
    const userID = values.user.userID;
    const personID = values.person.personID;
    const formData = new FormData();
    formData.append("user", JSON.stringify(values.user));
    formData.append("person", JSON.stringify(values.person));
    formData.append("personInfo", JSON.stringify(values.personInfo));
    formData.append("roleID", values.roleID.toString());
    if (values.person.avatar) formData.append("avatar", values.person.avatar);
    if (!hasDisability) {
      userID && personID ? editMutation({ userID, personID, data: formData }) : createMutation(formData);
    } else {
      const personDisability = { ...values.personDisability, personID: personID };
      formData.append("personDisability", JSON.stringify(personDisability));
      userID && personID ? editMutation({ userID, personID, data: formData }) : createMutation(formData);
    }
  };

  return (
    <RegisterFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          <Stepper.Step
            icon={currentErrorStep === 0 && <IconCircleX />}
            classNames={{
              stepIcon: cn(currentErrorStep === 0 && "bg-red-500 text-white  border-white")
            }}
            label={initialValues ? "Editar Usuario" : "Crear Usuario"}
          >
            <FormUser />
          </Stepper.Step>
          <Stepper.Step
            icon={currentErrorStep === 1 && <IconCircleX />}
            classNames={{
              stepIcon: cn(currentErrorStep === 1 && "bg-red-500 text-white  border-white")
            }}
            label={initialValues ? "Editar Información Personal" : "Información Personal"}
          >
            <FormPersonInfo />
          </Stepper.Step>
        </Stepper>
        <Group justify="center" mt="xl">
          <Button key="prev-step" onClick={prevStep}>
            Atrás
          </Button>
          {active < 1 ? (
            <Button
              key="next-step"
              onClick={() => {
                const validate =
                  form.validateField("user.email").hasError ||
                  form.validateField("user.password").hasError ||
                  form.validateField("person.firstName").hasError ||
                  form.validateField("person.middleName").hasError ||
                  form.validateField("person.lastNames").hasError ||
                  form.validateField("person.dni").hasError ||
                  form.validateField("person.avatar").hasError ||
                  form.validateField("roleID").hasError;
                if (!validate) {
                  setCurrentErrorStep(null);
                  nextStep();
                } else {
                  setCurrentErrorStep(active);
                }
              }}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isPendingCreate || isPendingEdite}
              onClick={() => {
                const validate = form.validate();
                if (validate.hasErrors) setCurrentErrorStep(active);
              }}
            >
              Guardar
            </Button>
          )}
        </Group>
      </form>
    </RegisterFormProvider>
  );
}
