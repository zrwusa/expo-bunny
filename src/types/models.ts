export interface DemoHello {
    name: string;
    order: number;
}

export interface DemoHello2 {
    company: string;
    companyId: string;
    job: string;
    jobId: string;
    isHighP: boolean;
}

export type DemoThunk = {
    id: number,
    text: string,
};

export type DemoEmployee = {
    first_name: string,
    last_name: string,
    email: string
};

export type Auth = {
    isLoading: boolean;
    isSignOut: boolean;
    accessToken: undefined | string | null;
};

export type Sys = {
    error: string;
    warn: string;
};

export interface RootState {
    demoHelloState: DemoHello;
    demoHello2State: DemoHello2;
    demoThunkState: DemoThunk;
    sysState:Sys;
    authState: Auth;
}



