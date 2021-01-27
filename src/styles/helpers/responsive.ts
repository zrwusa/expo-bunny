import {widthPercentageToDP as wp2dp, heightPercentageToDP as hp2dp} from "react-native-responsive-screen";
import appConfig from "../../app.config.json";
import {Dimension, Responsive} from "../../types/styles";
import {TraversableNested} from "../../types/helpers";

export const responsiveInit = () => {
    let responsive: TraversableNested = {}
    Object.entries(appConfig.UE.dimensions).forEach((dimension) => {
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

export default responsiveInit()

