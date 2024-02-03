import GoogleMap from "../GoogleMap/GoogleMap";
import { GoogleMapsInitializeOptions } from "../types";

function App() {
    const googleMapProperties: GoogleMapsInitializeOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        mapOptions: {
            center: {
                lat: 0,
                lng: 0,
            },
            zoom: 4,
        },
    };

    return (
        <>
            <GoogleMap {...googleMapProperties} />
        </>
    );
}

export default App;
