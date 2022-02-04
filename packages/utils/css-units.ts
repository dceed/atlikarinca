// https://github.com/Karibash/pixel-units/blob/main/src/defs.ts

const AbsoluteLengthUnitSuffix = {
  Pixel: "px",
  Centimeter: "cm",
  Millimeter: "mm",
  Quarter: "Q",
  Inch: "in",
  Pica: "pc",
  Point: "pt",
} as const;
export type AbsoluteLengthUnitSuffix =
  typeof AbsoluteLengthUnitSuffix[keyof typeof AbsoluteLengthUnitSuffix];

const RelativeLengthUnitSuffix = {
  REM: "rem",
  EM: "em",
  ViewWidth: "vw",
  ViewHeight: "vh",
  ViewMin: "vmin",
  ViewMax: "vmax",
} as const;
type RelativeLengthUnitSuffix = "rem" | "em" | "vw" | "vh" | "vmin" | "vmax";

const MultiplicationUnitSuffix = {
  Percent: "%",
  Magnification: "",
} as const;
export type MultiplicationUnitSuffix =
  typeof MultiplicationUnitSuffix[keyof typeof MultiplicationUnitSuffix];

const LengthUnitSuffix = {
  ...AbsoluteLengthUnitSuffix,
  ...RelativeLengthUnitSuffix,
};
export type LengthUnitSuffix =
  typeof LengthUnitSuffix[keyof typeof LengthUnitSuffix];

export const UnitSuffix = {
  ...LengthUnitSuffix,
  ...MultiplicationUnitSuffix,
};
export type UnitSuffix = typeof UnitSuffix[keyof typeof UnitSuffix];
export type Unit<Suffix extends UnitSuffix = UnitSuffix> = `${number}${Suffix}`;
