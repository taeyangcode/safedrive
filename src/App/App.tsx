import { createSignal } from "solid-js";
import GoogleMap, { GoogleMapProps } from "../GoogleMap/GoogleMap";
import Heatmap from "../Heatmap/Heatmap";
import { HeatmapDataPoint } from "../types";

function App() {
    const googleMapProperties: GoogleMapProps = {
        initializerOptions: {
            elementIdName: "map",
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapOptions: {
                center: {
                    lat: 37.77,
                    lng: -122.42,
                },
                zoom: 15,
            },
        },
        elementClasses: "w-screen h-screen",
        elementStyles: "",
    };

    const [heatmapPoints, setHeatmapPoints] = createSignal<HeatmapDataPoint[]>([
        new HeatmapDataPoint(37.77, -122.42),
    ]);

    setInterval(() => {
        setHeatmapPoints([
            ...heatmapPoints(),
            new HeatmapDataPoint(
                heatmapPoints()[heatmapPoints().length - 1].latitude + 0.05,
                -122.42,
            ),
        ]);
    }, 2_000);

    return (
        <div class="w-screen h-screen">
            <GoogleMap {...googleMapProperties}>
                <Heatmap heatmapPoints={heatmapPoints()} />
            </GoogleMap>
        </div>
    );
}

export default App;
