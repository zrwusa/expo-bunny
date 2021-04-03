import * as React from "react";
import {View} from "../UI";
import {ScaledImage} from "../ScalableImage/ScalableImage";
import {uuid4} from "@sentry/utils";
import {MasonryDatum} from "../../types";


export interface MasonryProps {
    data: MasonryDatum
}

export class Masonry extends React.PureComponent<MasonryProps> {
    constructor(props: MasonryProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {column1, column2, column3} = this.props.data

        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 1}}>
                    {column1.map(image => {
                        // return <Image key={uuid4()} source={{uri: image.uri}} style={{width: 100, height: 100}}/>
                        return <ScaledImage style={{marginBottom: 1}} key={uuid4()} uri={image.uri} width={375 / 3 - 1}/>
                    })}
                </View>
                <View style={{marginRight: 1}}>
                    {column2.map(image => {
                        // return <Image key={uuid4()} source={{uri: image.uri}} style={{width: 100, height: 100}}/>
                        return <ScaledImage style={{marginBottom: 1}} key={uuid4()} uri={image.uri} width={375 / 3 - 1}/>
                    })}
                </View>
                <View style={{marginRight: 0}}>
                    {column3.map(image => {
                        // return <Image key={uuid4()} source={{uri: image.uri}} style={{width: 100, height: 100}}/>
                        return <ScaledImage style={{marginBottom: 1}} key={uuid4()} uri={image.uri} width={375 / 3 - 1}/>
                    })}
                </View>
            </View>
        );
    }
}
