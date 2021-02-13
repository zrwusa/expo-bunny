declare module '@callstack/react-theme-provider' {
    import * as React from 'react';
    import hoistNonReactStatics = require('./hoist-non-react-statics');
    type $Without<T, K> = Pick<T, Exclude<keyof T, K>>;
    type $DeepPartial<T> = { [P in keyof T]?: $DeepPartial<T[P]> };

    export type ThemingType<Theme> = {
        ThemeProvider: React.ComponentType<{ theme?: Theme }>;
        withTheme: <Props extends { theme: Theme }, C>(
            WrappedComponent: React.ComponentType<Props> & C
        ) => React.ComponentType<
            $Without<Props, 'theme'> & { theme?: $DeepPartial<Theme> }
            > &
            hoistNonReactStatics.NonReactStatics<typeof WrappedComponent>;
        useTheme(overrides?: $DeepPartial<Theme>): Theme;
        ThemeContext:React.Context<Theme>
    };

    export const createTheming: <Theme>(defaultTheme: Theme) => ThemingType<Theme>;
}
