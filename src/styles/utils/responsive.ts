import {widthPercentageToDP as wp2dp, heightPercentageToDP as hp2dp} from "react-native-responsive-screen";
import bunnyConfig from "../../config.json";
import {Dimension, Responsive} from "../../types/styles";
import {TraversableNested} from "../../types/utils";

export const _getResponsive = () => {
    let responsive: TraversableNested = {}
    Object.entries(bunnyConfig.UE.dimensions).forEach((dimension) => {
        responsive[dimension[0]] = {
            wp: (width: number) => {
                return wp2dp((width / dimension[1]['width']) * 100 + '%');
            }, hp: (height: number) => {
                return hp2dp((height / dimension[1]['height']) * 100 + '%');
            }
        } as unknown as Dimension;
    })
    return responsive as Responsive;
}
const responsiveFromUE = _getResponsive();
export const getResponsive = _getResponsive
export default responsiveFromUE;
export const responsiveIphoneX = responsiveFromUE.iphoneX
