"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	cssVariables: true,
	palette: {
		mode: "light",
		primary: {
			main: "#1A73E8",
			light: "#4285F4",
			dark: "#0D47A1",
		},
		secondary: {
			main: "#34A853",
		},
		background: {
			default: "#F8F9FA",
			paper: "#FFFFFF",
		},
	},
	typography: {
		fontFamily: [
			"Inter",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			"sans-serif",
		].join(","),
		h6: {
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 500,
				},
			},
		},
	},
});

export default theme;
