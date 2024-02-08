import { createResource } from "solid-js";
import { HeatmapPoint } from "../types";
import { useGoogleMapObject } from "../GoogleMap/GoogleMap";

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
    heatmapPoints: HeatmapPoint[];
}

function Heatmap(props: HeatmapProps) {
    const googleMapObject = useGoogleMapObject();
    const [heatmap] = createResource(() => googleMapObject, createHeatmapLayer);

    return (
        <>
            {heatmap.loading && <> Loading... </>}
            {heatmap.error && <> Error! </>}
            {heatmap() && updateHeatmap(heatmap(), props.heatmapPoints)}
        </>
    );
}

export default Heatmap;
