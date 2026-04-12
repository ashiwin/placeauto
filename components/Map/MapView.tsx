"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { useAppSelector } from "@/lib/hooks";
import { getGoogleMapsLoader } from "@/lib/googleMapsLoader";

const MapView: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<google.maps.Map | null>(null);
	const markerRef = useRef<google.maps.Marker | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { mapPosition, selectedPlace } = useAppSelector((s) => s.places);

	useEffect(() => {
		const loader = getGoogleMapsLoader();

		loader
			.load()
			.then(() => {
				if (!mapContainerRef.current) return;

				mapRef.current = new google.maps.Map(mapContainerRef.current, {
					center: { lat: mapPosition.lat, lng: mapPosition.lng },
					zoom: mapPosition.zoom,
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: true,
					zoomControl: true,
					styles: [
						{
							featureType: "poi",
							elementType: "labels",
							stylers: [{ visibility: "off" }],
						},
					],
				});

				setLoading(false);
			})
			.catch(() => {
				setError("Could not load the map.");
				setLoading(false);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!mapRef.current || !selectedPlace) return;

		const position = { lat: selectedPlace.lat, lng: selectedPlace.lng };

		mapRef.current.panTo(position);
		mapRef.current.setZoom(mapPosition.zoom);

		if (markerRef.current) {
			markerRef.current.setPosition(position);
			markerRef.current.setTitle(selectedPlace.name);
		} else {
			markerRef.current = new google.maps.Marker({
				map: mapRef.current,
				position,
				title: selectedPlace.name,
				animation: google.maps.Animation.DROP,
			});
		}
	}, [selectedPlace, mapPosition.zoom]);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				height: "100%",
				borderRadius: 3,
				overflow: "hidden",
				bgcolor: "grey.100",
			}}
		>
			<Box ref={mapContainerRef} sx={{ width: "100%", height: "100%" }} />

			{loading && (
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 2,
						bgcolor: "grey.100",
					}}
				>
					<CircularProgress color="primary" />
					<Typography variant="body2" color="text.secondary">
						Loading map…
					</Typography>
				</Box>
			)}

			{error && (
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 1,
					}}
				>
					<MapIcon sx={{ fontSize: 48, color: "text.disabled" }} />
					<Typography variant="body2" color="text.secondary">
						{error}
					</Typography>
				</Box>
			)}

			{!loading && !error && !selectedPlace && (
				<Box
					sx={{
						position: "absolute",
						bottom: 16,
						left: "50%",
						transform: "translateX(-50%)",
						bgcolor: "rgba(255,255,255,0.9)",
						backdropFilter: "blur(4px)",
						px: 2,
						py: 1,
						borderRadius: 2,
						boxShadow: 1,
					}}
				>
					<Typography variant="caption" color="text.secondary">
						Search for a place to drop a pin
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default MapView;
