export interface GoogleMapsInitializeOptions {
    elementIdName: string;
    apiKey: string;
    mapOptions: google.maps.MapOptions;
}

export type HeatmapPoint = google.maps.LatLng | google.maps.visualization.WeightedLocation;
