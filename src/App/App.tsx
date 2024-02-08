import { createSignal } from "solid-js";
import GoogleMap, { GoogleMapProps } from "../GoogleMap/GoogleMap";
import Heatmap from "../Heatmap/Heatmap";
import { HeatmapPoint } from "../types";

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

    const [heatmapPoints, _] = createSignal<HeatmapPoint[]>([
        { lat: 37.77, lng: -122.42 },
        { lat: 37.77, lng: -122.42 },
        { lat: 37.77, lng: -122.42 },
        { lat: 37.77, lng: -122.42 },
    ]);

    return (
        <div class="w-screen h-screen">
            <GoogleMap {...googleMapProperties}>
                <Heatmap heatmapPoints={heatmapPoints()} />
            </GoogleMap>
        </div>
    );
}

export default App;
