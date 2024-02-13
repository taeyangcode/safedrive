import { createEffect, createResource } from "solid-js";
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
    heatmapPoints: google.maps.LatLng[] | google.maps.visualization.WeightedLocation[],
) {
    heatmap.setData(heatmapPoints);
}

export interface HeatmapProps {
    heatmapPoints: google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
}

function Heatmap(props: HeatmapProps) {
    const googleMapObject = useGoogleMapObject();
    const [heatmap] = createResource(() => googleMapObject, createHeatmapLayer);

    createEffect(() => {
        const heatmapObject: google.maps.visualization.HeatmapLayer | undefined = heatmap();
        if (heatmapObject !== undefined) {
            updateHeatmap(heatmapObject, props.heatmapPoints);
        }
    });

    return (
        <>
            {heatmap.loading && <> Loading... </>}
            {heatmap.error && <> Error! </>}
            {heatmap()}
        </>
    );
}

export default Heatmap;
