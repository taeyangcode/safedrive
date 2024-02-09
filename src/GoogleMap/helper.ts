import { Loader } from "@googlemaps/js-api-loader";

export interface GoogleMapsInitializeOptions {
    elementIdName: string;
    apiKey: string;
    mapOptions: google.maps.MapOptions;

    onBoundsChanged?: (arg0?: google.maps.LatLngBounds) => void;
}

export async function initializeGoogleMaps(
    options: GoogleMapsInitializeOptions,
): Promise<google.maps.Map> {
    const googleMapsLoader: Loader = new Loader({
        apiKey: options.apiKey,
        version: "weekly",
        libraries: ["places", "visualization"],
    });

    const { Map } = await googleMapsLoader.importLibrary("maps");
    const googleMapObject: google.maps.Map = new Map(
        document.getElementById(options.elementIdName) as HTMLElement,
        options.mapOptions,
    );

    const onBoundsChangedCallback = options.onBoundsChanged;
    if (onBoundsChangedCallback) {
        function addEventCallback<T>(
            googleMap: google.maps.Map,
            event: string,
            callback: (arg0?: T) => void,
        ) {
            googleMap.addListener(event, callback);
        }

        addEventCallback(googleMapObject, "bounds_changed", () =>
            onBoundsChangedCallback(googleMapObject.getBounds()),
        );
    }

    return googleMapObject;
}
