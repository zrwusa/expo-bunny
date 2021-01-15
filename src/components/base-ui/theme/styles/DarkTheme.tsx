import color from 'color';
import DefaultTheme from './DefaultTheme';
import { black, white, pinkA100 } from './colors';
import type { Theme } from '../types';
import palette from "../../palette";
import {Platform} from "react-native";

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    text: white,
    disabled: color(white).alpha(0.38).rgb().string(),
    placeholder: color(white).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA100,
    demoColor0: palette.white,
    demoColor1: palette.orange800,
    btnTextColor: palette.white,
    btnBgColor: palette.orange800,
    transparent: palette.transparent,
  },
  typography: {
    header: {
      fontFamily: Platform.select({
        web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'sans-serif'
      }),
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: Platform.select({
        web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'sans-serif'
      }),
      fontSize: 16,
    }
  },
  borderRadius: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
    xxl: 128,
  },
  demoThemeProperty0: '',
  demoThemeProperty1: '',
};

export default DarkTheme;
