import { GoogleMapsInitializeOptions } from "../types";
import { JSX, createContext, createResource, useContext } from "solid-js";
import { initializeGoogleMaps } from "./helper";

const GoogleMapObject = createContext<google.maps.Map>();

export function useGoogleMapObject(): google.maps.Map {
    const googleMapObjectValue = useContext(GoogleMapObject);
    if (googleMapObjectValue === undefined) {
        throw new Error("useGoogleMapObject must be used within a GoogleMapObject.Provider");
    }
    return googleMapObjectValue;
}

export interface GoogleMapProps {
    initializerOptions: GoogleMapsInitializeOptions;
    elementClasses: string;
    elementStyles: string;

    children?: JSX.Element;
}

function GoogleMap(props: GoogleMapProps) {
    const { initializerOptions, elementClasses, elementStyles } = props;

    const [googleMap] = createResource(() => ({ ...initializerOptions }), initializeGoogleMaps);

    return (
        <div id={initializerOptions.elementIdName} class={elementClasses} style={elementStyles}>
            {googleMap.loading && <div> Loading... </div>}
            {googleMap.error && <div> Error! </div>}
            {googleMap() && (
                <GoogleMapObject.Provider value={googleMap()}>{props.children}</GoogleMapObject.Provider>
            )}
        </div>
    );
}

export default GoogleMap;
