import { WatchmanLocation } from "@/models/watchman-location.model";
import { useGetWatchmanLocation } from "../services/getWatchmanLocation.service";
import WatchmanMarker from "./WatchmanMarker";

export default function WatchmanMarkers() {
  const { data: watchmanLocation } = useGetWatchmanLocation();

  return (
    <>
      {watchmanLocation?.map((wl: WatchmanLocation) => {
        return <WatchmanMarker key={wl.watchmanUserID} watchmanLocation={wl} />;
      })}
    </>
  );
}
