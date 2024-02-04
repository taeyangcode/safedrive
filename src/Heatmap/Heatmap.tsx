import { Resource, createSignal } from "solid-js";
import { HeatmapPoint } from "../types";

function createHeatmapLayer(
    googleMapObject: google.maps.Map,
): google.maps.visualization.HeatmapLayer {
    const heatmap = new google.maps.visualization.HeatmapLayer();
    heatmap.setMap(googleMapObject);
    return heatmap;
}

function updateHeatmap(
    heatmap: google.maps.visualization.HeatmapLayer,
    heatmapPoints: HeatmapPoint[],
) {
    heatmap.setData(heatmapPoints);
}

export interface HeatmapProps {
    googleMapObject: google.maps.Map;
    heatmapPoints: Resource<HeatmapPoint[]>;
}

function Heatmap(props: HeatmapProps) {
    const [heatmap, _] = createSignal(createHeatmapLayer(props.googleMapObject));

    return <>{updateHeatmap(heatmap(), props.heatmapPoints()!)}</>;
}

export default Heatmap;
