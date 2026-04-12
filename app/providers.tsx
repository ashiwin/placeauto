"use client";

import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@/store";
import theme from "@/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</Provider>
	);
}
