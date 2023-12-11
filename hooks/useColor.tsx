import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { RGBColor } from "colorthief";
import { parseUndefined } from "../../helpers/parsers";

interface ColorContextProps {
  colors: RGBColor[];
  updateColors: Dispatch<SetStateAction<RGBColor[]>>;
  getPrimaryColor: () => RGBColor;
  getColorForLaneIndex: (laneIndex: number) => RGBColor;
}

export const ColorContext = React.createContext({} as ColorContextProps);

interface ColorProps {
  children?: ReactNode;
}

const localColor: RGBColor[] = parseUndefined(sessionStorage.getItem("colors"));

export const ColorProvider = ({ children }: ColorProps) => {
  const [colors, setColors] = useState<RGBColor[]>(
    localColor || [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]
  );

  const getPrimaryColor = () => colors[0];
  const getColorForLaneIndex = (laneIndex: number) => colors[laneIndex];

  useEffect(() => {
    sessionStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  return (
    <ColorContext.Provider
      value={{
        colors,
        updateColors: setColors,
        getPrimaryColor,
        getColorForLaneIndex,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const { colors, updateColors, getPrimaryColor, getColorForLaneIndex } =
    useContext(ColorContext);
  return { colors, updateColors, getPrimaryColor, getColorForLaneIndex };
};
