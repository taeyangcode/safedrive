import { Library, Loader } from "@googlemaps/js-api-loader";

export interface GoogleMapInitializeOptions {
    elementIdName: string;
    apiKey: string;
    mapOptions: google.maps.MapOptions;
    libraries: Library[];

    eventData?: {
        onBoundsChanged?: (arg0?: google.maps.LatLngBounds) => void;
    };
}

function addEventCallback<T>(
    googleMap: google.maps.Map,
    event: string,
    callback: (arg0?: T) => void,
) {
    googleMap.addListener(event, callback);
}

export async function initializeGoogleMap(
    options: GoogleMapInitializeOptions,
): Promise<google.maps.Map> {
    const { elementIdName, apiKey, mapOptions, libraries, eventData } = options;

    const googleMapLoader: Loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: libraries,
    });

    const { Map } = await googleMapLoader.importLibrary("maps");
    const googleMapObject: google.maps.Map = new Map(
        document.getElementById(elementIdName) as HTMLElement,
        mapOptions,
    );

    if (!eventData) {
        return googleMapObject;
    }

    const { onBoundsChanged } = eventData;
    if (onBoundsChanged) {
        addEventCallback<google.maps.LatLngBounds>(googleMapObject, "bounds_changed", () =>
            onBoundsChanged(googleMapObject.getBounds()),
        );
    }

    return googleMapObject;
}
