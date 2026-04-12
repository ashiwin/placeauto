import { Loader } from "@googlemaps/js-api-loader";

let loaderInstance: Loader | null = null;

export const getGoogleMapsLoader = (): Loader => {
	if (!loaderInstance) {
		loaderInstance = new Loader({
			apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
			version: "weekly",
			// 'places' loads the new Places API (v2) which provides
			// PlaceAutocompleteElement and place.fetchFields()
			libraries: ["places"],
		});
	}
	return loaderInstance;
};
