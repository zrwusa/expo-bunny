const BunnyConstants = {
    latLngDeltaGrace: {
        latitudeDelta: 0.0069,
        longitudeDelta: 0.0045,
    },
    statusBarHeight: 20,
    THEME_NAME_PERSISTENCE_KEY: 'THEME_TYPE',
    LANGUAGE_TYPE_PERSISTENCE_KEY: 'LANGUAGE_TYPE',
    NAV_STATE_PERSISTENCE_KEY: 'NAVIGATION_STATE',
    ACCESS_TOKEN_PERSISTENCE_KEY: 'accessToken',
    USER_PERSISTENCE_KEY: 'user',
    fooInterval: setInterval((): void => undefined, 0),
    fooTimeout: setTimeout((): void => undefined, 0),
}

export default BunnyConstants
