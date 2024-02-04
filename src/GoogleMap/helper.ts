import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsInitializeOptions } from "../types";

export async function initializeGoogleMaps(options: GoogleMapsInitializeOptions): Promise<google.maps.Map> {
    const { elementIdName, apiKey, mapOptions } = options;

    const googleMapsLoader: Loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places", "visualization"],
    });

    const { Map } = await googleMapsLoader.importLibrary("maps");
    return new Map(document.getElementById(elementIdName) as HTMLElement, mapOptions);
}
