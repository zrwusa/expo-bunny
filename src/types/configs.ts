import {Dimensions} from "./styles";
import {APIConfigs} from "./api";

export type APPConfig = APIConfigs & {
    mock: {
        isHttps: boolean,
        port: number
    },
    UE: {
        dimensions: Dimensions;
    };
    useNativeDriver: boolean
};
