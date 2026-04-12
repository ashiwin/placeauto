"use client";

import React from "react";
import {
	Box,
	Paper,
	Typography,
	Chip,
	AppBar,
	Toolbar,
	Divider,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import PlaceSearch from "@/components/PlaceSearch";
import MapView from "@/components/Map";
import SearchHistory from "@/components/SearchHistory";
import { useAppSelector } from "@/lib/hooks";
import styles from "./page.module.css";
import "./globals.css";

export default function HomePage() {
	const selectedPlace = useAppSelector((s) => s.places.selectedPlace);

	return (
		<Box className={styles.pageWrapper}>
			<AppBar
				position="static"
				elevation={0}
				sx={{
					bgcolor: "background.paper",
					borderBottom: "1px solid",
					borderColor: "divider",
				}}
			>
				<Toolbar sx={{ gap: 1 }}>
					{/* <MapIcon color="primary" /> */}
					<Typography
						variant="h6"
						sx={{ flexGrow: 1, color: "text.primary" }}
					>
						Placeauto by Ashiwin
					</Typography>
					<Typography
						variant="caption"
						sx={{ color: "text.disabled" }}
					>
						Powered by Google Maps
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={styles.contentContainer}>
				<PlaceSearch />

				{selectedPlace && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Chip
							icon={<MapIcon fontSize="small" />}
							label={
								<Typography variant="caption" noWrap>
									<strong>{selectedPlace.name}</strong>
									{selectedPlace.formattedAddress
										? ` - ${selectedPlace.formattedAddress}`
										: ""}
								</Typography>
							}
							color="primary"
							variant="outlined"
							size="small"
							sx={{ maxWidth: "100%" }}
						/>
					</Box>
				)}

				<div className={styles.mainGrid}>
					<Paper
						elevation={0}
						sx={{
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
							overflow: "hidden",
							minHeight: 0,
						}}
					>
						<MapView />
					</Paper>

					<Paper
						elevation={0}
						sx={{
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
							overflow: "hidden",
							display: "flex",
							flexDirection: "column",
							minHeight: 0,
						}}
					>
						<SearchHistory />
					</Paper>
				</div>

				<Divider />
				<Typography
					variant="caption"
					sx={{
						color: "text.disabled",
						textAlign: "center",
						width: "100%",
					}}
				>
					Placeauto by Ashiwin. Built with Next.js 16, Redux Toolkit,
					RTK Listener Middleware, and Material UI 9
				</Typography>
			</div>
		</Box>
	);
}
