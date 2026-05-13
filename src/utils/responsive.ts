import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const responsiveWidth = (percentage: number) => wp(percentage);
export const responsiveHeight = (percentage: number) => hp(percentage);
export const responsiveFontSize = (size: number) => wp(size);