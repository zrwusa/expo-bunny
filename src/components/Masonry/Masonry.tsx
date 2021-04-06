import * as React from "react";
import {View} from "../UI";
import {ScaledImage} from "../ScalableImage/ScalableImage";
import {uuid4} from "@sentry/utils";
import {MasonryDatum} from "../../types";
import {WithSizeLabor, withSizeLabor} from "../../providers/size-labor";
import {WithThemeLabor, withThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";


export interface MasonryProps extends WithSizeLabor,WithThemeLabor{
    data: MasonryDatum
}

class MasonryInner extends React.PureComponent<MasonryProps> {
    constructor(props: MasonryProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {sizeLabor,themeLabor} = this.props
        const {wp} = sizeLabor.designsBasedOn.iphoneX
        const {column1, column2, column3} = this.props.data

        const styles = createStyles(sizeLabor,themeLabor)

        return (
            <View style={styles.masonry}>
                <View style={styles.column}>
                    {column1.map(image => {
                        return <ScaledImage style={styles.item} key={uuid4()} uri={image.uri} width={wp(375 / 3 - 1)}/>
                    })}
                </View>
                <View style={styles.column}>
                    {column2.map(image => {
                        return <ScaledImage style={styles.item} key={uuid4()} uri={image.uri} width={wp(375 / 3 - 1)}/>
                    })}
                </View>
                <View style={styles.columnLast}>
                    {column3.map(image => {
                        return <ScaledImage style={styles.item} key={uuid4()} uri={image.uri} width={wp(375 / 3 - 1)}/>
                    })}
                </View>
            </View>
        );
    }
}

export const Masonry = withSizeLabor(withThemeLabor(MasonryInner))
