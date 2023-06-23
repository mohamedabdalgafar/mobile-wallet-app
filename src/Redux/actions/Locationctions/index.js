import {
  UPDATE_USER_LOCATION,
  ADD_NEW_LOCATION,
  GET_ALL_PLACES,
  DELETE_ADDRESS,
  CHANGE_TO_PRIME_LOC,
  LOAD_PLACE_DELETE,
  MODIFY_LOCATION,
} from '../../actionTypes';

export const redUpdateUserLocation = payload => ({
  type: UPDATE_USER_LOCATION,
  payload,
});

export const redSaveNewLocation = async (data, payload) => {
  let newArr = [];
  if (data.length == 0) {
    newArr = [
      {...payload, address_primary: '1', loadDelete: false, loadPrime: false},
    ];
  } else {
    newArr = [
      ...data,
      {...payload, address_primary: '0', loadDelete: false, loadPrime: false},
    ];
  }

  return {
    type: ADD_NEW_LOCATION,
    payload: newArr,
  };
};

export const redModifyLocation = async (data, payload) => {
  let allPlaces = data;
  let tempcart = allPlaces.map((item, index) => {
    if (item.address_id == payload.address_id) {
      return {
        ...item,
        address_description: payload.address_description,
        address_lang: payload.address_lang,
        address_lat: payload.address_lat,
        address_title: payload.address_title,
        build_number: payload.build_number,
        floor_number: payload.floor_number,
        apartment_number: payload.apartment_number,
        special_marque: payload.special_marque,
      };
    } else {
      return item;
    }
  });

  return {
    type: MODIFY_LOCATION,
    payload: tempcart,
  };
};

export const getAllPlaces = payload => {
  let tempcart = payload.map((item, index) => {
    return {...item, loadDelete: false, loadPrime: false};
  });
  return {
    type: GET_ALL_PLACES,
    payload: tempcart,
  };
};

export const deleteAddress = async (data, sItem) => {
  let newArr = [];

  let allPlaces = data;
  newArr = allPlaces.filter(item => item.address_id !== sItem.address_id);
  if (newArr.length > 0) {
    if (newArr.length == 1) {
      newArr = [{...newArr[0], address_primary: '1'}];
    } else if (newArr.length > 1 && sItem.address_primary == '1') {
      newArr = newArr.map((item, index) => {
        if (index == 0) {
          return {...item, address_primary: '1'};
        } else {
          return {...item, address_primary: '0'};
        }
      });
    }
  }

  return {
    type: DELETE_ADDRESS,
    payload: newArr,
  };
};

export const changeToPrime = async (data, itemId) => {
  let allPlaces = data;
  let tempcart = allPlaces.map((item, index) => {
    if (item.address_id == itemId) {
      return {...item, address_primary: '1'};
    } else {
      return {...item, address_primary: '0'};
    }
  });
  return {
    type: CHANGE_TO_PRIME_LOC,
    payload: tempcart,
  };
};

export const loadPlaceDelete = async (data, id, val) => {
  let allPlaces = data;

  let tempcart = allPlaces.map((item, index) => {
    if (item.address_id == id) {
      return {...item, loadDelete: val};
    }
    return item;
  });
  return {
    type: LOAD_PLACE_DELETE,
    payload: tempcart,
  };
};

export const loadPlacePrime = async (data, id, val) => {
  let allPlaces = data;

  let tempcart = allPlaces.map((item, index) => {
    if (item.address_id == id) {
      return {...item, loadPrime: val};
    }
    return item;
  });
  return {
    type: LOAD_PLACE_DELETE,
    payload: tempcart,
  };
};
