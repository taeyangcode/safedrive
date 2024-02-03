import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsInitializeOptions } from "../types";
import { createResource } from "solid-js";

async function initializeGoogleMaps(options: GoogleMapsInitializeOptions): Promise<google.maps.Map> {
    const { elementIdName, apiKey, mapOptions } = options;

    const googleMapsLoader: Loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places", "visualization"],
    });

    const { Map } = await googleMapsLoader.importLibrary("maps");
    return new Map(document.getElementById(elementIdName) as HTMLElement, mapOptions);
}

export interface GoogleMapProps {
    initializerOptions: GoogleMapsInitializeOptions;
}

function GoogleMap(props: GoogleMapProps) {
    const googleMap = createResource(() => ({ ...props.initializerOptions }), initializeGoogleMaps);

    return <div id={props.initializerOptions.elementIdName} style={`width: 100vw; height: 100vh;`}></div>;
}

export default GoogleMap;
