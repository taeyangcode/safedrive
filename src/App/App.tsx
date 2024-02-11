import { createSignal } from "solid-js";
import GoogleMap, { GoogleMapProps } from "../GoogleMap/GoogleMap";
import Heatmap, { HeatmapDataPoint } from "../Heatmap/Heatmap";
import { handleBoundsChanged } from "./helper";

function App() {
    const [heatmapPoints, setHeatmapPoints] = createSignal<HeatmapDataPoint[]>([]);

    const googleMapProperties: GoogleMapProps = {
        initializerOptions: {
            elementIdName: "map",
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapOptions: {
                center: {
                    lat: 33.88,
                    lng: -118.41,
                },
                zoom: 15,
            },
            libraries: ["places", "visualization"],

            eventData: {
                onBoundsChanged: (bounds?: google.maps.LatLngBounds) =>
                    handleBoundsChanged(setHeatmapPoints, bounds),
            },
        },
        elementClasses: "w-screen h-screen",
        elementStyles: "",
    };

    return (
        <div class="w-screen h-screen">
            <GoogleMap {...googleMapProperties}>
                <Heatmap heatmapPoints={heatmapPoints()} />
            </GoogleMap>
        </div>
    );
}

export default App;
