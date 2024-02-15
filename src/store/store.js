import { configureStore } from "@reduxjs/toolkit";

import provider from "./reducers/provider";
import semaphore from "./reducers/semaphore";
import zkCV from "./reducers/zkCV";

export const store = configureStore({
    reducer: {
        provider,
        semaphore,
        zkCV
    },
    middleware: getDefaultMiddleWare =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
});
