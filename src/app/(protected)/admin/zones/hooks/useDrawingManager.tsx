import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { DrawResult } from "../types/types";

type DrawingManagerEvents = {
  onOverlayComplete?: (latLng: google.maps.LatLng[]) => void;
  onDragEnd?: (latLng: google.maps.LatLng[]) => void;
  onInsertAt?: (latLng: google.maps.LatLng[]) => void;
  onSetAt?: (latLng: google.maps.LatLng[]) => void;
  onPathChange?: (path: google.maps.LatLng[]) => void;
};

interface DrawingManagerProps {
  drawingMode?: google.maps.drawing.OverlayType | null;
  drawingControl?: boolean;
  drawingControlOptions?: google.maps.drawing.DrawingControlOptions;
  circleOptions?: google.maps.CircleOptions;
  markerOptions?: google.maps.MarkerOptions;
  polygonOptions?: google.maps.PolygonOptions;
  polylineOptions?: google.maps.PolylineOptions;
  rectangleOptions?: google.maps.RectangleOptions;
  events?: DrawingManagerEvents;
}

export function useDrawingManager({ events, ...props }: DrawingManagerProps) {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [selectedShape, setSelectedShape] = useState<google.maps.Polygon | null>(null);
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});

  Object.assign(callbacks.current, {
    onDragEnd: events?.onDragEnd,
    onInsertAt: events?.onInsertAt,
    onSetAt: events?.onSetAt,
    onPathChange: events?.onPathChange
  });

  const clearSelectedShape = () => {
    if (selectedShape) {
      selectedShape.setPaths([]);
      selectedShape.setMap(null);
      setSelectedShape(null);
    }
    drawingManager?.setOptions({ drawingMode: null });
  };

  const initDrawingManager = () => {
    if (!map || !drawing) return null;
    return new drawing.DrawingManager({
      map,
      drawingMode: props?.drawingMode,
      drawingControl: props?.drawingControl,
      drawingControlOptions: props?.drawingControlOptions ?? {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: props?.polygonOptions,
      circleOptions: props?.circleOptions,
      markerOptions: props?.markerOptions,
      polylineOptions: props?.polylineOptions,
      rectangleOptions: props?.rectangleOptions
    });
  };

  useEffect(() => {
    if (!map || !drawing) return;
    const manager = initDrawingManager();
    setDrawingManager(manager);
  }, [map, drawing, props?.polygonOptions?.fillColor, props?.polygonOptions?.strokeColor]);

  useEffect(() => {
    if (!drawingManager) return;
    const eventListeners: Array<google.maps.MapsEventListener> = [];
    const overlayCompleteListener = google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      (drawResult: DrawResult) => {
        // Check if the type of the overlay is a polygon
        const isPolygon = drawResult.type === google.maps.drawing.OverlayType.POLYGON;
        if (isPolygon) {
          // Check if the polygon has at least 3 points
          // const pathLength = drawResult.overlay.getPath().getArray().length;
          setSelectedShape(drawResult.overlay);
          if (events?.onPathChange) events.onPathChange(drawResult.overlay.getPath().getArray());
          // if (pathLength >= 3) setSelectedShape(drawResult.overlay);
          // else {
          //   drawResult.overlay.setPath([]);
          //   drawResult.overlay.setMap(null);
          //   return;
          // }

          drawingManager.setOptions({ drawingMode: null });

          // Add event listeners
          events?.onOverlayComplete && events.onOverlayComplete(drawResult.overlay.getPath().getArray());

          const gme = google.maps.event;
          [["dragend", "onDragEnd"]].forEach(([eventName, eventCallback]) => {
            const event = gme.addListener(drawResult.overlay, eventName, () => {
              const callback = callbacks.current[eventCallback];
              const points = drawResult.overlay.getPath().getArray();
              if (callback) callback(points);
              if (events?.onPathChange) events.onPathChange(points);
            });
            eventListeners.push(event);
          });

          [
            ["insert_at", "onInsertAt"],
            ["set_at", "onSetAt"]
          ].forEach(([eventName, eventCallback]) => {
            const event = gme.addListener(drawResult.overlay.getPath(), eventName, () => {
              const callback = callbacks.current[eventCallback];
              const points = drawResult.overlay.getPath().getArray();
              if (callback) callback(points);
              if (events?.onPathChange) events.onPathChange(points);
            });
            eventListeners.push(event);
          });
        }
      }
    );

    eventListeners.push(overlayCompleteListener);

    return () => {
      eventListeners.forEach((listener) => google.maps.event.removeListener(listener));
    };
  }, [drawingManager]);

  return { drawingManager, selectedShape, clearSelectedShape };
}
