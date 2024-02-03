import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsInitializeOptions } from "../types";
import { createResource } from "solid-js";

async function initializeGoogleMaps({ apiKey, mapOptions }: GoogleMapsInitializeOptions): Promise<google.maps.Map> {
    const googleMapsLoader: Loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places", "visualization"],
    });

    const { Map } = await googleMapsLoader.importLibrary("maps");
    return new Map(document.getElementById("map") as HTMLElement, mapOptions);
}

interface GoogleMapProps {
    apiKey: string;
    mapOptions: google.maps.MapOptions;
}

function GoogleMap(props: GoogleMapProps) {
    const googleMap = createResource(() => ({ ...props }), initializeGoogleMaps);

    return <div id="map" style={`width: 100vw; height: 100vh;`}></div>;
}

export default GoogleMap;
