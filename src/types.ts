export interface GoogleMapsInitializeOptions {
    elementIdName: string;
    apiKey: string;
    mapOptions: google.maps.MapOptions;
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface WeightedCoordinate {
    coordinate: Coordinate;
    weight: number;
}

export type HeatmapPoint = Coordinate | WeightedCoordinate;
