// Theming only cares about these properties e.g. colors,fonts families,animations. Do not restrict the size attribute.
// Although borderRadius is also a size, it does not affect the entire page and will not cause confusion,
// so borderRadius is included in the theme attribute. All other size-related attributes are managed by measure
declare namespace ReactNativePaper {
    interface ThemeFonts {
        demoFont0: ThemeFont,
        demoFont1: ThemeFont,
    }

    interface ThemeColors {
        demoColor0: string,
        demoColor1: string,
        btnBgColor: string,
        btnTextColor: string,
        transparent: string,
    }

    interface ThemeAnimation {
        demoProperty0: number,
        demoProperty1: number,
    }

    interface Theme {
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
}
