import type { AppStartListening } from "@/store";
import { selectPlace } from "./placesSlice";

export const addPlacesListeners = (startListening: AppStartListening) => {
	startListening({
		actionCreator: selectPlace,
		effect: (_action, listenerApi) => {
			try {
				const history = listenerApi.getState().places.searchHistory;
				localStorage.setItem("places_history", JSON.stringify(history));
			} catch {
				// localStorage unavailable (SSR guard)
			}
		},
	});
};
