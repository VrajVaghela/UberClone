import React, { memo } from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries = ["places", "marker"];

const MapsWrapper = memo(({ children }) => {
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            mapIds={[import.meta.env.VITE_GOOGLE_MAPS_ID]}
            libraries={libraries}
            loadingElement={
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
            }
        >
            {children}
        </LoadScript>
    );
});

MapsWrapper.displayName = 'MapsWrapper';

export default MapsWrapper;
