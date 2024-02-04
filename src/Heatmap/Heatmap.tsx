import { createSignal } from "solid-js";

type HeatmapPoint = google.maps.LatLng;

export interface HeatmapProps {
    googleMapObject: google.maps.Map;
}

function createHeatmapLayer(heatmapPoints: HeatmapPoint[], googleMapObject: google.maps.Map) {
    console.info("heatmap layer created");

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapPoints,
    });
    heatmap.setMap(googleMapObject);
}

function Heatmap(props: HeatmapProps) {
    const [heatmapPoints, setHeatmapPoints] = createSignal<HeatmapPoint[]>([
        new google.maps.LatLng({
            lat: 33.81597,
            lng: -118.304413,
        }),
    ]);

    setInterval(
        () =>
            setHeatmapPoints((currentPoints) => {
                return [
                    ...currentPoints,
                    new google.maps.LatLng({
                        lat: currentPoints[currentPoints.length - 1].lat() + 0.01,
                        lng: -118.304413,
                    }),
                ];
            }),
        3_000,
    );

    return <>{createHeatmapLayer(heatmapPoints(), props.googleMapObject)}</>;
}

export default Heatmap;
