import * as React from 'react';
import {useEffect, useRef} from 'react';

export const useIsMounted = () => {
    // component is certainly mounted from the beginning
    const componentIsMounted = useRef(true);
    useEffect(() => {
        // when non-SSR + (ComponentDidMount or ComponentDidUpdate):
        // do nothing.
        // when non-SSR + ComponentWillUnmount:
        return () => {
            componentIsMounted.current = false;
        };
    }, []);
    return componentIsMounted;
};
