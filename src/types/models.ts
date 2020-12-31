export type Auth = {
    isLoading: boolean;
    isSignOut: boolean;
    accessToken: undefined | string | null;
    error: string;
    warn:string;
};

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

export type DemoEmployee = {
    first_name: string,
    last_name: string,
    email: string
};

export type IDemoThunk = {
    id: number,
    text: string,
};

export interface RootState {
    demoHelloState: DemoHello;
    demoHello2State: DemoHello2;
    demoThunkState: IDemoThunk;
    authState: Auth
}



