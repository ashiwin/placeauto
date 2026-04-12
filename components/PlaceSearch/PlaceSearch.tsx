"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAppDispatch } from "@/lib/hooks";
import { selectPlace } from "@/store/slices/places";
import { getGoogleMapsLoader } from "@/lib/googleMapsLoader";
import type { PlaceResult } from "@/types";

const PlaceSearch: React.FC = () => {
	const dispatch = useAppDispatch();
	const containerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [initError, setInitError] = useState<string | null>(null);

	useEffect(() => {
		const loader = getGoogleMapsLoader();

		loader
			.load()
			.then(async () => {
				if (!containerRef.current) return;

				const autocompleteEl =
					new google.maps.places.PlaceAutocompleteElement({});

				const host = autocompleteEl as unknown as HTMLElement;
				host.style.width = "100%";
				containerRef.current.appendChild(host);

				host.addEventListener("gmp-placeselect", async (raw: Event) => {
					const event = raw as google.maps.places.PlaceSelectEvent;
					const place = event.place;

					await place.fetchFields({
						fields: [
							"id",
							"displayName",
							"formattedAddress",
							"location",
						],
					});

					if (!place.location) return;

					const result: PlaceResult = {
						placeId: place.id ?? crypto.randomUUID(),
						name: place.displayName ?? "Unknown place",
						formattedAddress: place.formattedAddress ?? "",
						lat: place.location.lat(),
						lng: place.location.lng(),
						searchedAt: new Date().toISOString(),
					};

					dispatch(selectPlace(result));
				});

				setLoading(false);
			})
			.catch(() => {
				setInitError(
					"Failed to load Google Maps. Ensure your API key has the Places API (New) enabled.",
				);
				setLoading(false);
			});
	}, [dispatch]);

	return (
		<Box>
			{loading && (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						p: 1.5,
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 3,
						bgcolor: "background.paper",
					}}
				>
					<CircularProgress size={18} color="primary" />
					<Typography variant="body2" color="text.secondary">
						Loading search…
					</Typography>
				</Box>
			)}
			{initError && (
				<Typography
					variant="caption"
					color="error"
					sx={{ display: "block", mt: 1 }}
				>
					{initError}
				</Typography>
			)}
			<Box
				ref={containerRef}
				sx={{
					display: loading ? "none" : "block",
					width: "100%",
					"& gmp-placeautocomplete": {
						width: "100%",
						"--gmp-filled-input-border-radius": "12px",
					},
				}}
			/>
		</Box>
	);
};

export default PlaceSearch;
