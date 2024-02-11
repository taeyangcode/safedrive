import { GoogleMapProps } from "../GoogleMap/GoogleMap";
import { HeatmapDataPoint } from "../Heatmap/Heatmap";

export type CoordinateColumnName = "Start_Lat" | "Start_Lng" | "End_Lat" | "End_Lng" | "Severity";

export interface DataframeColumn<NameType, ValueType> {
    bit_settings: string;
    datatype: string;
    name: NameType;
    values: ValueType[];
}

export interface Accident {
    columns: [
        DataframeColumn<"Start_Lat", number>,
        DataframeColumn<"Start_Lng", number>,
        DataframeColumn<"End_Lat", number>,
        DataframeColumn<"End_Lat", number>,
        DataframeColumn<"Severity", number>,
    ];
}

export const googleMapProperties: GoogleMapProps = {
    initializerOptions: {
        elementIdName: "map",
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        mapOptions: {
            center: {
                lat: 33.88,
                lng: -118.41,
            },
            zoom: 15,
        },
        libraries: ["places", "visualization"],

        eventData: {
            onBoundsChanged: handleBoundsChanged,
        },
    },
    elementClasses: "w-screen h-screen",
    elementStyles: "",
};

async function handleBoundsChanged(bounds?: google.maps.LatLngBounds) {
    if (!bounds) {
        return;
    }
    if (!isSignficantChange(bounds)) {
        return;
    }
    previousBounds = bounds;

    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const url = new URL("api/v1/data_points", "http://localhost:8000");
    url.searchParams.append("north", northEast.lat().toString());
    url.searchParams.append("east", northEast.lng().toString());
    url.searchParams.append("south", southWest.lat().toString());
    url.searchParams.append("west", southWest.lng().toString());

    const accidentDataResponse: Response = await fetch(url);
    const accidentData: Accident = await accidentDataResponse.json();

    // return accidentData.columns
    //     .map((accident: DataframeColumn<CoordinateColumnName>) => new HeatmapDataPoint(

let previousBounds: google.maps.LatLngBounds | undefined = undefined;

const isSignficantChange = (newBounds?: google.maps.LatLngBounds): boolean => {
    if (newBounds === undefined) {
        return false;
    }
    if (previousBounds === undefined) {
        return true;
    }

    const milesPerLatitude: number = 69.2;
    const milesPerLongitude: number = 54.6;

    const significantLatitudeDifference: number = 1;
    const significantLongitudeDifference: number = 1;

    const latitudeDifference: number = Math.abs(
        newBounds.getNorthEast().lat() - previousBounds.getNorthEast().lat(),
    );

    const longitudeDifference: number = Math.abs(
        newBounds.getNorthEast().lng() - previousBounds.getNorthEast().lng(),
    );

    console.log(latitudeDifference * milesPerLatitude, longitudeDifference * milesPerLongitude);

    return (
        latitudeDifference * milesPerLatitude >= significantLatitudeDifference ||
        longitudeDifference * milesPerLongitude >= significantLongitudeDifference
    );
};
