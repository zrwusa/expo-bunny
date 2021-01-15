import type * as React from 'react';


type Mode = 'adaptive' | 'exact';

export interface Font {
    fontFamily: string;
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
}

export interface Fonts {
    regular: Font;
    medium: Font;
    light: Font;
    thin: Font;
    demoFont0: Font,
    demoFont1: Font,
}

export interface Colors {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onSurface: string;
    onBackground: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    demoColor0: string,
    demoColor1: string,
    btnBgColor: string,
    btnTextColor: string,
    transparent: string,
}

export interface Animation {
    scale: number;
    demoProperty0: number,
    demoProperty1: number,
}

export interface Theme {
    dark: boolean;
    mode?: Mode;
    roundness: number;
    colors: Colors;
    fonts: Fonts;
    animation: Animation;
    borderRadius: {
        xxs: number,
        xs: number,
        s: number,
        m: number,
        l: number,
        xl: number,
        xxl: number,
    },
    typography: {
        header: {
            fontFamily: string,
            fontSize?: number,
            fontWeight?: string,
        },
        body: {
            fontFamily: string,
            fontSize?: number,
        }
    },
    demoThemeProperty0: string,
    demoThemeProperty1: string,
}
