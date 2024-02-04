import GoogleMap, { GoogleMapProps } from "../GoogleMap/GoogleMap";

function App() {
    const googleMapProperties: GoogleMapProps = {
        initializerOptions: {
            elementIdName: "map",
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            mapOptions: {
                center: {
                    lat: 33.81597,
                    lng: -118.304413,
                },
                zoom: 15,
            },
        },
        elementClasses: "w-screen h-screen",
        elementStyles: "",
    };

    return (
        <div class="w-screen h-screen">
            <GoogleMap {...googleMapProperties} />
        </div>
    );
}

export default App;
