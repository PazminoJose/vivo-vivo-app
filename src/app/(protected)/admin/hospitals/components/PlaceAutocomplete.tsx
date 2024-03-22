import { Card, TextInput, TextInputProps } from "@mantine/core";
import { ControlPosition, MapControl, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, useCallback, useEffect, useState } from "react";

export type Place = {
  address?: string;
  latLng: google.maps.LatLngLiteral;
};

interface Props {
  onPlaceSelect: (place: Place | null) => void;
  currentPlace?: Place | null;
  inputProps?: TextInputProps;
}

export const PlaceAutocomplete = ({ onPlaceSelect, currentPlace, inputProps }: Props) => {
  const map = useMap();
  const places = useMapsLibrary("places");
  const geocoding = useMapsLibrary("geocoding");

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  useEffect(() => {
    if (!currentPlace || geocoding === null) return;
    if (!currentPlace.address) {
      const geocoder = new geocoding.Geocoder();
      geocoder.geocode({ location: currentPlace.latLng }).then((res) => {
        onPlaceSelect({
          address: res.results[0].formatted_address,
          latLng: currentPlace.latLng
        });
        setInputValue(res.results[0].formatted_address);
      });
    } else {
      setInputValue(currentPlace.address ?? "");
      map?.moveCamera({ center: currentPlace.latLng, zoom: 15 });
    }
  }, [currentPlace, geocoding]);

  useEffect(() => {
    if (inputValue === "") onPlaceSelect(null);
  }, [inputValue]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken
      };

      const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
        const latLng = placeDetails?.geometry?.location;
        const address = placeDetails?.formatted_address;
        onPlaceSelect({
          address: address ?? "",
          latLng: { lat: latLng?.lat() ?? 0, lng: latLng?.lng() ?? 0 }
        });
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
        const LatLng = placeDetails?.geometry?.location;
        map?.moveCamera({ center: { lat: LatLng?.lat() ?? 0, lng: LatLng?.lng() ?? 0 }, zoom: 15 });
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <MapControl position={ControlPosition.TOP_CENTER}>
      <div className="mt-2">
        <TextInput
          placeholder="Dirección"
          value={inputValue}
          onInput={(event: FormEvent<HTMLInputElement>) => {
            onInputChange(event);
          }}
          {...inputProps}
        />

        {predictionResults.length > 0 && (
          <Card>
            <ul className="flex flex-col gap-2 ">
              {predictionResults.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    className="custom-list-item rounded-lg p-2 hover:cursor-pointer hover:bg-primary-300"
                    onClick={() => handleSuggestionClick(place_id)}
                  >
                    {description}
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </MapControl>
  );
};
