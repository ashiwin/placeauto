import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PlaceResult, MapPosition } from "@/types";

interface PlacesState {
	searchHistory: PlaceResult[];
	selectedPlace: PlaceResult | null;
	mapPosition: MapPosition;
	loading: boolean;
	error: string | null;
}

const DEFAULT_MAP_POSITION: MapPosition = {
	lat: 3.1483,
	lng: 101.7082,
	zoom: 12,
};

const initialState: PlacesState = {
	searchHistory: [],
	selectedPlace: null,
	mapPosition: DEFAULT_MAP_POSITION,
	loading: false,
	error: null,
};

const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {
		selectPlace(state, action: PayloadAction<PlaceResult>) {
			const place = action.payload;
			const alreadyExists = state.searchHistory.some(
				(p) => p.placeId === place.placeId,
			);
			if (!alreadyExists) {
				state.searchHistory = [place, ...state.searchHistory];
			}
			state.selectedPlace = place;
			state.mapPosition = { lat: place.lat, lng: place.lng, zoom: 15 };
			state.error = null;
		},
		focusHistoryItem(state, action: PayloadAction<PlaceResult>) {
			const place = action.payload;
			state.selectedPlace = place;
			state.mapPosition = { lat: place.lat, lng: place.lng, zoom: 15 };
		},
		clearHistory(state) {
			state.searchHistory = [];
			state.selectedPlace = null;
			state.mapPosition = DEFAULT_MAP_POSITION;
		},
		removeHistoryItem(state, action: PayloadAction<string>) {
			state.searchHistory = state.searchHistory.filter(
				(p) => p.placeId !== action.payload,
			);
			if (state.selectedPlace?.placeId === action.payload) {
				state.selectedPlace = state.searchHistory[0] ?? null;
			}
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	selectPlace,
	focusHistoryItem,
	clearHistory,
	removeHistoryItem,
	setError,
} = placesSlice.actions;

export default placesSlice.reducer;
