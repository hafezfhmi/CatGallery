import React, { useContext } from "react";

const ImageDetailContext = React.createContext();

export function useImageDetailContext() {
  return useContext(ImageDetailContext);
}

export const ImageDetailContextProvider = (props) => {
  let { imageId, imageCreatorId } = props;

  return (
    <ImageDetailContext.Provider value={{ imageId, imageCreatorId }}>
      {props.children}
    </ImageDetailContext.Provider>
  );
};
