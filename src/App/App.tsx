import { createSignal } from "solid-js";
import GoogleMap, { GoogleMapProps } from "../GoogleMap/GoogleMap";
import Heatmap, { HeatmapDataPoint } from "../Heatmap/Heatmap";

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
        libraries: ["places", "visualization"],

        eventData: {},
    },
    elementClasses: "w-screen h-screen",
    elementStyles: "",
};

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
