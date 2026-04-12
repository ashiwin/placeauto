export {};

declare global {
	namespace google.maps.places {
		interface PlaceSelectEvent extends Event {
			place: google.maps.places.Place;
		}
	}
}
