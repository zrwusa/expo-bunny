export interface Config {
    [key: string]: {
        path?: string;
        exact?: boolean;
        parse?: Record<string, (value: string) => any>;
        stringify?: Record<string, (value: any) => string>;
        screens?: Config;
        initialRouteName?: string;
    };
}
