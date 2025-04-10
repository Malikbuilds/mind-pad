"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps as NextThemeProviderProps,
} from "next-themes";

export function ThemeProvider(props: NextThemeProviderProps) {
  return <NextThemesProvider {...props} />;
};