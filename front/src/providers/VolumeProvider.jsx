import { createContext } from "react";

export const VolumeContext = createContext({});

export const VolumeProvider = props => {
    const { children } = props;
    const sample = { sampleValue: 'test' };

    return (
        <VolumeContext.Provider value={sample}>
            {children}
        </VolumeContext.Provider>
    );
};