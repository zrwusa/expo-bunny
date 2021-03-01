import {Dimensions, PixelRatio} from 'react-native';


const widthPercentageToDP = (widthPercent: string | number): number => {
    const screenWidth = Dimensions.get('window').width;
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth);
};

const heightPercentageToDP = (heightPercent: string | number): number => {
    const screenHeight = Dimensions.get('window').height;
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight);
};


export {
    widthPercentageToDP,
    heightPercentageToDP,
};
