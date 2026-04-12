export interface PlaceResult {
	placeId: string;
	name: string;
	formattedAddress: string;
	lat: number;
	lng: number;
	searchedAt: string;
}

export interface MapPosition {
	lat: number;
	lng: number;
	zoom: number;
}
