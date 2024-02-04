import { GoogleMapsInitializeOptions, HeatmapPoint } from "../types";
import { createResource } from "solid-js";
import { initializeGoogleMaps } from "./helper";
import Heatmap from "../Heatmap/Heatmap";

export interface GoogleMapProps {
    initializerOptions: GoogleMapsInitializeOptions;
    elementClasses: string;
    elementStyles: string;
}

let i = 1;

function GoogleMap(props: GoogleMapProps) {
    const [googleMap] = createResource(
        () => ({ ...props.initializerOptions }),
        initializeGoogleMaps,
    );

    const [heatmapPoints, { mutate: setHeatmapPoints }] = createResource(
        googleMap,
        (): HeatmapPoint[] => [new google.maps.LatLng({ lat: 33.815933, lng: -118.304453 })],
    );

    setInterval(() => {
        console.log("interval ran");
        setHeatmapPoints(
            heatmapPoints()!.length >= 10
                ? []
                : [
                      ...heatmapPoints()!,
                      new google.maps.LatLng({ lat: 33.815933 + i++, lng: -118.304453 }),
                  ],
        );
    }, 2_000);

    return (
        <div
            id={props.initializerOptions.elementIdName}
            class={props.elementClasses}
            style={props.elementStyles}
        >
            {googleMap.loading && "Loading..."}
            {googleMap.error && "Error occured!"}
            {googleMap() && (
                <Heatmap googleMapObject={googleMap()!} heatmapPoints={heatmapPoints} />
            )}
        </div>
    );
}

export default GoogleMap;
