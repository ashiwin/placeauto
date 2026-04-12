import {
	configureStore,
	createListenerMiddleware,
	addListener,
} from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";
import { placesReducer, addPlacesListeners } from "./slices/places";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
	reducer: {
		places: placesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Register all feature listeners
addPlacesListeners(listenerMiddleware.startListening as AppStartListening);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const appAddListener = addListener as AppAddListener;
