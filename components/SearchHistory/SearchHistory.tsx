"use client";

import React from "react";
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
	Divider,
	Button,
	Chip,
	Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import HistoryIcon from "@mui/icons-material/History";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	focusHistoryItem,
	removeHistoryItem,
	clearHistory,
} from "@/store/slices/places";
import type { PlaceResult } from "@/types";

const formatTime = (iso: string): string => {
	const date = new Date(iso);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SearchHistory: React.FC = () => {
	const dispatch = useAppDispatch();
	const { searchHistory, selectedPlace } = useAppSelector((s) => s.places);

	const handleFocus = (place: PlaceResult) => {
		dispatch(focusHistoryItem(place));
	};

	const handleRemove = (e: React.MouseEvent, placeId: string) => {
		e.stopPropagation();
		dispatch(removeHistoryItem(placeId));
	};

	const handleClearAll = () => {
		dispatch(clearHistory());
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 2,
					py: 1.5,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<HistoryIcon fontSize="small" color="action" />
					<Typography
						variant="subtitle2"
						color="text.secondary"
						sx={{ fontWeight: 600 }}
					>
						Search History
					</Typography>
					{searchHistory.length > 0 && (
						<Chip
							label={searchHistory.length}
							size="small"
							color="primary"
							sx={{ height: 18, fontSize: "0.65rem" }}
						/>
					)}
				</Box>
				{searchHistory.length > 0 && (
					<Tooltip title="Clear all">
						<Button
							size="small"
							startIcon={<ClearAllIcon fontSize="small" />}
							onClick={handleClearAll}
							color="inherit"
							sx={{
								color: "text.secondary",
								fontSize: "0.75rem",
							}}
						>
							Clear
						</Button>
					</Tooltip>
				)}
			</Box>

			<Divider />

			{/* Empty state */}
			{searchHistory.length === 0 && (
				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 1,
						p: 3,
					}}
				>
					<LocationOnIcon
						sx={{ fontSize: 40, color: "text.disabled" }}
					/>
					<Typography variant="body2" color="text.disabled">
						Your searched places will appear here
					</Typography>
				</Box>
			)}

			{/* History list */}
			{searchHistory.length > 0 && (
				<List disablePadding sx={{ overflowY: "auto", flex: 1 }}>
					{searchHistory.map((place, index) => {
						const isSelected =
							selectedPlace?.placeId === place.placeId;
						return (
							<React.Fragment key={place.placeId}>
								{/*
                  MUI v9: ListItemSecondaryAction is removed.
                  Use the secondaryAction prop directly on ListItem instead.
                */}
								<ListItem
									disablePadding
									secondaryAction={
										<Tooltip title="Remove">
											<IconButton
												size="small"
												edge="end"
												onClick={(e) =>
													handleRemove(
														e,
														place.placeId,
													)
												}
												sx={{
													color: "text.disabled",
													"&:hover": {
														color: "error.main",
													},
												}}
											>
												<DeleteOutlinedIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									}
								>
									<ListItemButton
										onClick={() => handleFocus(place)}
										selected={isSelected}
										sx={{
											py: 1.25,
											pr: 6,
											"&.Mui-selected": {
												bgcolor: "action.selected",
												borderLeft: "3px solid",
												borderLeftColor: "primary.main",
											},
											"&.Mui-selected:hover": {
												bgcolor: "action.selected",
											},
										}}
									>
										<ListItemIcon sx={{ minWidth: 36 }}>
											<LocationOnIcon
												fontSize="small"
												color={
													isSelected
														? "primary"
														: "action"
												}
											/>
										</ListItemIcon>
										<ListItemText
											primary={
												<Typography
													variant="body2"
													sx={{
														fontWeight: isSelected
															? 600
															: 400,
													}}
													noWrap
												>
													{place.name}
												</Typography>
											}
											secondary={
												<Typography
													variant="caption"
													color="text.disabled"
													noWrap
												>
													{formatTime(
														place.searchedAt,
													)}{" "}
													&middot;{" "}
													{place.formattedAddress}
												</Typography>
											}
										/>
									</ListItemButton>
								</ListItem>
								{index < searchHistory.length - 1 && (
									<Divider
										variant="inset"
										component="li"
										sx={{ ml: 7 }}
									/>
								)}
							</React.Fragment>
						);
					})}
				</List>
			)}
		</Box>
	);
};

export default SearchHistory;
