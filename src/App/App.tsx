import { createSignal } from "solid-js";
import GoogleMap from "../GoogleMap/GoogleMap";
import Heatmap, { HeatmapDataPoint } from "../Heatmap/Heatmap";
import { googleMapProperties } from "./helper";

function App() {
    const [heatmapPoints, _] = createSignal<HeatmapDataPoint[]>([]);

    return (
        <div class="w-screen h-screen">
            <GoogleMap {...googleMapProperties}>
                <Heatmap heatmapPoints={heatmapPoints()} />
            </GoogleMap>
        </div>
    );
}

export default App;
