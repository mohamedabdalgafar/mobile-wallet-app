import axios from './api';
import {chnageAlertModal} from '../Redux/actions';
import store from '../Redux/store';
export const POST = async (path, data) => {
  try {
    let fetch = await axios.post(`${path}`, data);
    if (fetch.status == 200) {
      let res = fetch.data;
      if (res.status == 'success') {
        return res.message;
      } else {
        let modalData = {show: true, message: res.message, res: 'error'};
        store.dispatch(chnageAlertModal(modalData));
        return null;
      }
    } else {
      let modalData = {show: true, message: 'حدث خطأ ما', res: 'error'};
      store.dispatch(chnageAlertModal(modalData));
      return null;
    }
  } catch (error) {
    let modalData = {show: true, message: 'حدث خطأ ما', res: 'error'};
    store.dispatch(chnageAlertModal(modalData));
  }
};

export const GET = async path => {
  try {
    let fetch = await axios.post(`${path}`);

    if (fetch.status == 200) {
      let res = fetch.data;

      if (res.status == 'success') {
        return res.message;
      } else {
        let modalData = {show: true, message: res.message, res: 'error'};
        store.dispatch(chnageAlertModal(modalData));
        return null;
      }
    } else {
      let modalData = {show: true, message: 'حدث خطأ ما', res: 'error'};
      store.dispatch(chnageAlertModal(modalData));
      return null;
    }
  } catch (error) {
    let modalData = {show: true, message: 'حدث خطأ ما', res: 'error'};
    store.dispatch(chnageAlertModal(modalData));
  }
};
