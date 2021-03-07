import React, {ReactNode} from "react";

type DemoInstance = { name: string };

export interface ContextValue extends DemoInstance {
};
const DemoContext = React.createContext<ContextValue>({name: ''});

export type DemoProviderProps = {
    children: ReactNode;
    demoInstance: DemoInstance;
};

function DemoProvider(props: DemoProviderProps) {
    const {children, demoInstance} = props;
    if (demoInstance === undefined) {
        throw new Error('The component using the the context must be a descendant of the context provider')
    }
    return (
        <DemoContext.Provider value={demoInstance}>
            {children}
        </DemoContext.Provider>
    );
}

const useDemo = (): ContextValue => React.useContext(DemoContext);

export {DemoProvider, useDemo};