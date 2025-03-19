"use client";
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from "react";

import { GoogleMapsContext } from "@vis.gl/react-google-maps";

import type { Ref } from "react";

type PolygonEventProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onRightClick?: (e: google.maps.MapMouseEvent) => void;
  onDrag?: (path: google.maps.LatLng[]) => void;
  onDragStart?: (path: google.maps.LatLng[]) => void;
  onDragEnd?: (path: google.maps.LatLng[]) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
  onInsertAt?: (path: google.maps.LatLng[]) => void;
  onSetAt?: (path: google.maps.LatLng[]) => void;
  onPathChange?: (path: google.maps.LatLng[]) => void;
  paths: google.maps.LatLng[];
};

type PolygonCustomProps = {
  /**
   * this is an encoded string for the path, will  be decoded and used as a path
   */
  encodedPaths?: string[];
};

export type PolygonProps = google.maps.PolygonOptions & PolygonEventProps & PolygonCustomProps;

export type PolygonRef = Ref<google.maps.Polygon | null>;

function usePolygon(props: PolygonProps) {
  const {
    onClick,
    onRightClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    onInsertAt,
    onSetAt,
    onPathChange,
    encodedPaths,
    paths,
    ...polygonOptions
  } = props;
  // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});
  Object.assign(callbacks.current, {
    onClick,
    onRightClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    onInsertAt,
    onSetAt
  });

  // const geometryLibrary = useMapsLibrary("geometry");

  const polygon = useRef(new google.maps.Polygon()).current;
  // update PolygonOptions (note the dependencies aren't properly checked
  // here, we just assume that setOptions is smart enough to not waste a
  // lot of time updating values that didn't change)
  useMemo(() => {
    polygon.setOptions(polygonOptions);
  }, [polygon, polygonOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // update the paths
  useEffect(() => {
    if (!paths) return;
    polygon.setPaths(paths);
    const gme = google.maps.event;

    [
      ["insert_at", "onInsertAt"],
      ["set_at", "onSetAt"]
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon.getPath(), eventName, () => {
        const callback = callbacks.current[eventCallback];
        const points = polygon.getPath().getArray();
        if (callback) callback(points);
        if (onPathChange) onPathChange(points);
      });
    });
    return () => {
      gme.clearInstanceListeners(polygon.getPath());
    };
  }, [paths]);

  // create polygon instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined) console.error("<Polygon> has to be inside a Map component.");
      return;
    }
    polygon.setMap(map);
    return () => {
      polygon.setMap(null);
    };
  }, [map]);

  // attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polygon || !paths) return;
    polygon.setPath(paths);

    // Add event listeners
    const gme = google.maps.event;

    [
      ["insert_at", "onInsertAt"],
      ["set_at", "onSetAt"]
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon.getPath(), eventName, () => {
        const callback = callbacks.current[eventCallback];
        const points = polygon.getPath().getArray();
        if (callback) callback(points);
        if (onPathChange) onPathChange(points);
      });
    });

    [
      ["dragstart", "onDragStart"],
      ["drag", "onDrag"],
      ["dragend", "onDragEnd"]
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon, eventName, () => {
        const callback = callbacks.current[eventCallback];
        const points = polygon.getPath().getArray();
        if (callback) callback(points);
        if (onPathChange) onPathChange(points);
      });
    });

    [
      ["click", "onClick"],
      ["rightclick", "onRightClick"],
      ["mouseover", "onMouseOver"],
      ["mouseout", "onMouseOut"]
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon, eventName, (e: google.maps.MapMouseEvent) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polygon);
      gme.clearInstanceListeners(polygon.getPath());
    };
  }, [polygon]);

  return polygon;
}

/**
 * Component to render a Google Maps polygon on a map
 */
export const Polygon = forwardRef(function PolygonComponent(props: PolygonProps, ref: PolygonRef) {
  const polygon = usePolygon(props);
  useImperativeHandle(ref, () => polygon, []);

  return null;
});
