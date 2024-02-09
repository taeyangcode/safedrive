import { createResource } from "solid-js";
import { HeatmapDataPoint } from "../types";
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
    heatmapPoints: HeatmapDataPoint[],
) {
    heatmap.setData(heatmapPoints.map((point: HeatmapDataPoint) => point.toGoogleMapPoint()));
}

export interface HeatmapProps {
    heatmapPoints: HeatmapDataPoint[];
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
