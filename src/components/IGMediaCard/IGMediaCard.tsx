import {PureComponent} from "react";
import {IcoMoon, View} from "../UI";
import {Image, Text} from "react-native";
import {ShowVideo} from "../Video/Video";
import {ReadMore} from "../ReadMore/ReadMore";
import {WithSizeLabor, withSizeLabor} from "../../providers/size-labor";
import {WithThemeLabor, withThemeLabor} from "../../providers/theme-labor";
import * as React from "react";
import {IGMediaCardDatum} from "../../types";
import {createStyles} from "./styles";

interface IGMediaCardProps extends WithSizeLabor, WithThemeLabor {
    card: IGMediaCardDatum
}

class IGMediaCardInner extends PureComponent<IGMediaCardProps> {
    constructor(props: IGMediaCardProps) {
        super(props)
    }

    render() {
        const {sizeLabor, themeLabor} = this.props
        const {designsBasedOn} = this.props.sizeLabor
        const {theme} = this.props.themeLabor;
        const {wp} = designsBasedOn.iphoneX
        const {colors} = theme;
        const bottomBarIconColor = colors.text;
        const styles = createStyles(sizeLabor, themeLabor)
        const {category, user, userAvatar, avSource, imageSource, likes, comments} = this.props.card;
        return (<View>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {/*todo Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.*/}
                        <Image
                            style={styles.headerLeftAvatar}
                            width={wp(26)}
                            height={wp(26)}
                            source={userAvatar}/>
                    </View>
                    <Text style={styles.headerLeftUser}>{user}</Text>
                </View>
                <View>
                    <Text style={styles.headerRightText}>...</Text>
                </View>
            </View>
            {
                category === 'IMAGE'
                    ? imageSource
                    ? <Image
                        style={styles.image}
                        width={wp(373)}
                        height={wp(210)}
                        source={imageSource}/>
                    : null
                    : <ShowVideo
                        isLooping={false}
                        source={avSource}
                    />
            }

            <View style={styles.bottomBar}>
                <View style={styles.bottomBarLeft}>
                    <IcoMoon name="heart" size={wp(20)} color={bottomBarIconColor}/>
                    <IcoMoon name="bubble" size={wp(20)} color={bottomBarIconColor}/>
                    <IcoMoon name="paperplane1" size={wp(18)} color={bottomBarIconColor}/>
                </View>

                <View>
                    <IcoMoon name="bookmark-o" size={wp(20)} color={bottomBarIconColor}/>
                </View>
            </View>
            <View style={styles.comments}>
                <Text style={styles.commentsLikes}>{likes} likes</Text>
                {comments.map(comment => {
                    const {id, text} = comment;
                    return <ReadMore key={id}
                                     numberOfLines={1}
                    >
                        <Text
                            style={styles.comment}>{text}</Text></ReadMore>
                })}
            </View>
        </View>)
    }

}

export const IGMediaCard = withSizeLabor(withThemeLabor(IGMediaCardInner))
