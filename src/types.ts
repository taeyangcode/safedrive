export interface GoogleMapsInitializeOptions {
    elementIdName: string;
    apiKey: string;
    mapOptions: google.maps.MapOptions;
}

export class HeatmapDataPoint {
    latitude: number;
    longitude: number;
    weight?: number;

    constructor(latitude: number, longitude: number, weight?: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.weight = weight;
    }

    public toGoogleMapPoint(): google.maps.LatLng | google.maps.visualization.WeightedLocation {
        const coordinate: google.maps.LatLng = new google.maps.LatLng(
            this.latitude,
            this.longitude,
        );

        if (this.weight === undefined) {
            return coordinate;
        }
        return {
            location: coordinate,
            weight: this.weight,
        };
    }
}
