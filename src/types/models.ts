import {GoogleUser} from "expo-google-app-auth";

export interface DemoHello {
    name: string,
    order: number,
}

export interface DemoHello2 {
    company: string,
    companyId: string,
    job: string,
    jobId: string,
    isHighP: boolean,
}

export type DemoThunk = {
    id: number,
    text: string,
}

export type DemoEmployee = {
    first_name: string,
    last_name: string,
    email: string,
}

export type NearbyFilm = {
    title: string,
    coordinate: {
        latitude: number,
        longitude: number,
    },
    image: {
        uri: string,
    },
    description: string,
}

export type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}
export type DemoMap = {
    demoNearbyFilms: NearbyFilm[],
    region: Region,
}

export type User = {
    email:string,
    password:string,
    nickname:string
}

export type Auth = {
    isLoading: boolean,
    isSignOut: boolean,
    accessToken: undefined | string | null,
    user?:User|GoogleUser
}

export type Font = {
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
};

export type Fonts = {
    regular: Font;
    medium: Font;
    light: Font;
    thin: Font;
};

type Mode = 'adaptive' | 'exact';

export type Theme = {
    dark: boolean;
    mode?: Mode;
    roundness: number;
    colors: {
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
    };
    fonts: Fonts;
    animation: {
        scale: number;
    };
};


export type ThemeNav = {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
    };
};

export type Sys = {
    error: string,
    warn: string,
    theme:Theme,
}

export interface RootState {
    sysState: Sys,
    authState: Auth,
    demoHelloState: DemoHello,
    demoHello2State: DemoHello2,
    demoThunkState: DemoThunk,
    demoMapState: DemoMap,
}
