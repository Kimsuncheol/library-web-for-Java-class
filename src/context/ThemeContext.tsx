import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as ColorMode) || "system";
  });

  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      if (prevMode === "system") return "light";
      if (prevMode === "light") return "dark";
      return "system";
    });
  };

  const theme = useMemo(() => {
    let paletteMode: "light" | "dark";

    if (mode === "system") {
      paletteMode = systemPrefersDark ? "dark" : "light";
    } else {
      paletteMode = mode;
    }

    return createTheme({
      palette: {
        mode: paletteMode,
      },
    });
  }, [mode, systemPrefersDark]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
