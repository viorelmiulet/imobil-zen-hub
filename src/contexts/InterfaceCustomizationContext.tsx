import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorPalette = "green" | "blue" | "purple" | "red" | "orange";
export type InterfaceDensity = "compact" | "comfortable" | "spacious";

type InterfaceCustomizationContextType = {
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;
  interfaceDensity: InterfaceDensity;
  setInterfaceDensity: (density: InterfaceDensity) => void;
};

const InterfaceCustomizationContext = createContext<InterfaceCustomizationContextType | undefined>(undefined);

export function InterfaceCustomizationProvider({ children }: { children: React.ReactNode }) {
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(() => {
    return (localStorage.getItem("color-palette") as ColorPalette) || "green";
  });

  const [interfaceDensity, setInterfaceDensityState] = useState<InterfaceDensity>(() => {
    return (localStorage.getItem("interface-density") as InterfaceDensity) || "comfortable";
  });

  const setColorPalette = (palette: ColorPalette) => {
    setColorPaletteState(palette);
    localStorage.setItem("color-palette", palette);
  };

  const setInterfaceDensity = (density: InterfaceDensity) => {
    setInterfaceDensityState(density);
    localStorage.setItem("interface-density", density);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all palette classes
    root.classList.remove("palette-green", "palette-blue", "palette-purple", "palette-red", "palette-orange");
    // Add current palette class
    root.classList.add(`palette-${colorPalette}`);
    
    // Remove all density classes
    root.classList.remove("density-compact", "density-comfortable", "density-spacious");
    // Add current density class
    root.classList.add(`density-${interfaceDensity}`);
  }, [colorPalette, interfaceDensity]);

  return (
    <InterfaceCustomizationContext.Provider
      value={{ colorPalette, setColorPalette, interfaceDensity, setInterfaceDensity }}
    >
      {children}
    </InterfaceCustomizationContext.Provider>
  );
}

export function useInterfaceCustomization() {
  const context = useContext(InterfaceCustomizationContext);
  if (!context) {
    throw new Error("useInterfaceCustomization must be used within InterfaceCustomizationProvider");
  }
  return context;
}
