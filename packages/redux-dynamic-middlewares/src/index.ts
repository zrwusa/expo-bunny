import {compose, Middleware, MiddlewareAPI} from 'redux';

const createDynamicMiddlewares = () => {
    let allDynamicMiddlewares: Middleware[] = [];
    let allAppliedDynamicMiddlewares: Middleware[] = [];
    let store: MiddlewareAPI<any, any>;

    const enhancer: Middleware = (_store: MiddlewareAPI<any, any>) => {
        store = _store;
        return next => (action) => {
            // @ts-ignore
            return compose(...allAppliedDynamicMiddlewares)(next)(action);
        };
    };

    const addMiddleware = (...middlewares: Middleware[]) => {
        // @ts-ignore
        allAppliedDynamicMiddlewares.push(...middlewares.map(middleware => middleware(store)));
        allDynamicMiddlewares.push(...middlewares);
    };

    const removeMiddleware = (middleware: Middleware) => {
        const index = allDynamicMiddlewares.findIndex(d => d === middleware);

        if (index === -1) {
            console.error('Middleware does not exist!', middleware);
            return;
        }

        allDynamicMiddlewares = allDynamicMiddlewares.filter((_, mdwIndex) => mdwIndex !== index);
        allAppliedDynamicMiddlewares = allAppliedDynamicMiddlewares
            .filter((_, mdwIndex) => mdwIndex !== index);
    };

    const resetMiddlewares = () => {
        allAppliedDynamicMiddlewares = [];
        allDynamicMiddlewares = [];
    };

    return {
        enhancer,
        addMiddleware,
        removeMiddleware,
        resetMiddlewares,
    };
};

const dynamicMiddlewaresInstance = createDynamicMiddlewares();

export default dynamicMiddlewaresInstance.enhancer;

export const {
    addMiddleware,
    removeMiddleware,
    resetMiddlewares,
} = dynamicMiddlewaresInstance;

export {
    createDynamicMiddlewares,
};
