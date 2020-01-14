import React from 'react';

const StudioContext = React.createContext({});

export const StudioProvider = StudioContext.Provider;
export const StudioConsumer = StudioContext.Consumer;
export default StudioContext;
