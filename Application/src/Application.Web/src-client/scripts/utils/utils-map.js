
export const getViewCorners = (mapObj) => {
  let bounds = mapObj.getBounds();
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();
  let minLat = southWest.lat();
  let maxLat = northEast.lat();
  let minLon = southWest.lng();
  let maxLon = northEast.lng();
  let viewCorners =  {
    upperLatitude: maxLat,
    lowerLatitude: minLat,
    upperLongitude: maxLon,
    lowerLongitude: minLon
  };
  return viewCorners;
};
