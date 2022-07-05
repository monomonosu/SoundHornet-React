import { createContext, useState } from "react";

export const VolumeContext = createContext();

export const VolumeProvider = props => {
    const { children } = props;
    const [volume, setVolume] = useState(0);

    return (
        <VolumeContext.Provider value={{ volume, setVolume }}>
            {children}
        </VolumeContext.Provider>
    );
};