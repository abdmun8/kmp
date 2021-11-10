import { Color, ListColors } from "../data/colors";

/**
 * Returns a Boolean value whether valid or not hex color
 * @param string color to test
 */
export const validateColor = (color: string) => {
  const regex: RegExp = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(color);
};

type CalculateSaturation = {
  r: number;
  g: number;
  b: number;
};
/**
 * get saturation based on rgb
 * @param param {r,g,b} values
 */
const calculateSaturation = ({ r, g, b }: CalculateSaturation) => {
  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  return ((max - min) / (max + min)) * 100;
};

/**
 * return {r,g,b,s} object value based on hex color
 * @param hex hex color
 */
export const parseColorValue = (hex: Color["color"]) => {
  let r, g, b;
  if (hex.length === 4) {
    r = hex[1].repeat(2);
    g = hex[2].repeat(2);
    b = hex[3].repeat(2);
  } else {
    r = hex.substr(1, 2);
    g = hex.substr(3, 2);
    b = hex.substr(5, 2);
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  const saturation: number = calculateSaturation({ r, g, b });
  return { r, g, b, saturation };
};

/**
 * Returns sorted color based on rgb value
 * @param colors colors to sort
 */
export const sortColors = (colors: ListColors) => {
  return colors.sort((color1: Color, color2: Color) => {
    const parsedColor1: CalculateSaturation = parseColorValue(color1.color);
    const parsedColor2: CalculateSaturation = parseColorValue(color2.color);

    if (parsedColor1.r !== parsedColor2.r)
      return parsedColor2.r - parsedColor1.r;
    if (parsedColor1.g !== parsedColor2.g)
      return parsedColor2.g - parsedColor1.g;
    return parsedColor2.b - parsedColor1.b;
  });
};

export type ColorFilter = (color: Color) => boolean;

/**
 * returns left value after iterating filter
 * @param filters color filters
 * @param initialValue
 */
export const reduceFilters = (
  filters: ColorFilter[],
  initialValue: ListColors
) =>
  filters.reduce(
    (result, currentFilter) => result.filter(currentFilter),
    initialValue
  );

/**
 * returns capitalize first letter
 * @param str string
 */
export const ucFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
