import {AppData} from '../constants';

export const getLocationName = async (myLat, myLon) => {
  let _req = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      myLat +
      ',' +
      myLon +
      '&key=' +
      AppData.GOOGLE_MAPS_API +
      '&language=ar',
  );
  return _req;
};
