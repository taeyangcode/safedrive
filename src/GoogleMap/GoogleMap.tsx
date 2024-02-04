import { GoogleMapsInitializeOptions } from "../types";
import { createResource } from "solid-js";
import { initializeGoogleMaps } from "./helper";
import Heatmap from "../Heatmap/Heatmap";

export interface GoogleMapProps {
    initializerOptions: GoogleMapsInitializeOptions;
    elementClasses: string;
    elementStyles: string;
}

function GoogleMap(props: GoogleMapProps) {
    const [googleMap] = createResource(() => ({ ...props.initializerOptions }), initializeGoogleMaps);

    return (
        <div id={props.initializerOptions.elementIdName} class={props.elementClasses} style={props.elementStyles}>
            {googleMap.loading && "Loading..."}
            {googleMap.error && "Error occured!"}
            {googleMap() && <Heatmap googleMapObject={googleMap()} />}
        </div>
    );
}

export default GoogleMap;
