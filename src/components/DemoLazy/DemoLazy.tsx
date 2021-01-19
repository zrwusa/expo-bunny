import React from "react";

export const DemoLazy100 = React.lazy(async () => {
        const module = await import('./DemoLazyReality')
        await new Promise(resolve => setTimeout(resolve, 100));
        return {default: module.DemoLazyReality}
    }
);
export const DemoLazy2000 = React.lazy(async () => {
        const module = await import('./DemoLazyReality')
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {default: module.DemoLazyReality}
    }
);
