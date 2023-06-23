import { COLORS, SIZES, FONTS } from './theme';
import images from './images';
import icons from './icons';
import lotties from './lotties';
const AppData = {
  appName: 'E-Wallet',
  API_ADDRESS: 'https://campcoding.tech/pharmacy_project/user/',
  GOOGLE_MAPS_API: 'AIzaSyAv0zTFavJT9I6rvLufEodpCvtMkEkdIX8',
  phoneRegExp: '^01[0-2,5]{1}[0-9]{8}$',
  passRegExp: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
};
export { COLORS, SIZES, FONTS, images, icons, lotties, AppData };
