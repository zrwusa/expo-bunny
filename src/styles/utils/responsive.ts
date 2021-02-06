import {widthPercentageToDP as wp2dp, heightPercentageToDP as hp2dp} from "../responsive/responsiveScreen";
import bunnyConfig from "../../config.json";
import {Dimension, Responsive} from "../../types/styles";
import {TraversableNested} from "../../types/utils";
const getResponsive = () => {
    let responsive: TraversableNested = {}
    Object.entries(bunnyConfig.UE.dimensions).forEach((dimension) => {
        responsive[dimension[0]] = {
            wp: (width: number) => {
                return wp2dp((width / dimension[1]['width']) );
            }, hp: (height: number) => {
                return hp2dp((height / dimension[1]['height']) );
            }
        } as unknown as Dimension;
    })
    return responsive as Responsive;
}
export default getResponsive
