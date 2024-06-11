import { phoneRegex } from "@/lib/utils/phoneRegex";
import { Button, NumberInput, Radio, RadioGroup, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Marker } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import Map from "../../../components/Map";
import GoogleMapApiProvider from "../../../providers/GoogleMapApiProvider";
import { usePostHospital } from "../hooks/usePostHospital.hook";
import { usePutHospital } from "../hooks/usePutHospital.hook";
import { Place, PlaceAutocomplete } from "./PlaceAutocomplete";

const hospitalSchema = z.object({
  hospitalID: z.number().optional(),
  hospitalName: z.string().min(5, "El nombre del hospital es muy corto"),
  hospitalAddress: z.string().min(1, "La dirección del hospital es obligatoria"),
  hospitalPhone: z.string().regex(phoneRegex, "El número de teléfono no es válido"),
  hospitalLatitude: z.number(),
  hospitalLongitude: z.number(),
  floorsNumber: z.number().min(1, "El número de pisos debe ser mayor a 0"),
  state: z.number()
});

export type HospitalSchema = z.infer<typeof hospitalSchema>;

interface FormHospitalProps {
  onSubmitSuccess?: () => void;
  initialValues?: HospitalSchema | null;
}

const hospitalInitialValues: HospitalSchema = {
  hospitalName: "",
  hospitalAddress: "",
  hospitalPhone: "",
  hospitalLatitude: 0,
  hospitalLongitude: 0,
  floorsNumber: 0,
  state: 1
};

export default function FormHospital({ onSubmitSuccess, initialValues }: FormHospitalProps) {
  const defaultCenter: google.maps.LatLngLiteral = useMemo(
    () => ({ lat: -1.253351, lng: -78.623011 }),
    []
  );
  const [place, setPlace] = useState<Place | null>();

  const form = useForm({
    initialValues: initialValues || hospitalInitialValues,
    validate: zodResolver(hospitalSchema)
  });

  const { mutate: createMutation, isPending: isPendingCreate } = usePostHospital({
    onSuccess: onSubmitSuccess
  });
  const { mutate: editMutation, isPending: isPendingEdit } = usePutHospital({
    onSuccess: onSubmitSuccess
  });

  const handleSubmit = (values: HospitalSchema) => {
    if (values.hospitalID) {
      editMutation({ hospitalID: values.hospitalID, hospital: values });
      return;
    } else {
      createMutation(values);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setPlace({
        address: initialValues.hospitalAddress,
        latLng: {
          lat: initialValues.hospitalLatitude,
          lng: initialValues.hospitalLongitude
        }
      });
    }
  }, [
    initialValues?.hospitalLatitude,
    initialValues?.hospitalLongitude,
    initialValues?.hospitalAddress
  ]);

  useEffect(() => {
    if (place) {
      form.setFieldValue("hospitalAddress", place.address || "");
      form.setFieldValue("hospitalLatitude", place.latLng.lat);
      form.setFieldValue("hospitalLongitude", place.latLng.lng);
    }
  }, [place]);

  return (
    <form className="grid grid-cols-2 gap-x-3 gap-y-3" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        className="col-span-2"
        placeholder="Nombre"
        label="Nombre"
        {...form.getInputProps("hospitalName")}
      />
      <TextInput placeholder="Teléfono" label="Teléfono" {...form.getInputProps("hospitalPhone")} />
      <NumberInput
        placeholder="Número de pisos"
        label="Número de pisos"
        {...form.getInputProps("floorsNumber")}
      />
      <RadioGroup
        label="Estado"
        {...form.getInputProps("state")}
        onChange={(value) => form.setFieldValue("state", parseInt(value))}
      >
        <div className="flex items-center gap-3">
          <Radio label="Activo" value={1} />
          <Radio label="Inactivo" value={0} />
        </div>
      </RadioGroup>
      <Button className="self-end" type="submit" loading={isPendingCreate}>
        Guardar
      </Button>
      <div className="col-span-2">
        <GoogleMapApiProvider>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={13}
            zoomControl={false}
            streetViewControl={false}
            onClick={(e) => {
              if (e.detail.latLng) {
                setPlace({
                  latLng: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }
                });
              }
            }}
            style={{
              height: "350px"
            }}
          >
            <PlaceAutocomplete
              onPlaceSelect={(place) => {
                if (place) {
                  setPlace(place);
                }
              }}
              currentPlace={place}
              inputProps={{
                onChange: (e) => {
                  form.getInputProps("hospitalAddress").onChange(e);
                },
                error: form.getInputProps("hospitalAddress").error
              }}
            />
            {place && <Marker position={{ lat: place.latLng.lat, lng: place.latLng.lng }} />}
          </Map>
        </GoogleMapApiProvider>
      </div>
    </form>
  );
}
