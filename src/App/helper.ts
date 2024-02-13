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

export async function handleBoundsChanged(
    setHeatmapPoints: (arg0: HeatmapDataPoint[]) => void,
    bounds?: google.maps.LatLngBounds,
) {
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

    const accidentPoints: google.maps.visualization.WeightedLocation[] = [];
    const [latitude, longitude, severity] = [
        accidentData.columns[0].values,
        accidentData.columns[1].values,
        accidentData.columns[4].values,
    ];
    for (let rowIndex = 0; rowIndex < latitude.length; ++rowIndex) {
        accidentPoints.push({
            location: new google.maps.LatLng(latitude[rowIndex], longitude[rowIndex]),
            weight: severity[rowIndex],
        });
    }
    setHeatmapPoints(accidentPoints);
}

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

    return (
        latitudeDifference * milesPerLatitude >= significantLatitudeDifference ||
        longitudeDifference * milesPerLongitude >= significantLongitudeDifference
    );
};
