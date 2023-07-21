export enum EBoxenColor {
  BLACK = "black",
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  BLUE = "blue",
  MAGENTA = "magenta",
  CYAN = "cyan",
  WHITE = "white",
  GRAY = "gray",
}

export enum EBoxenBorderStyle {
  SINGLE = "single",
  DOUBLE = "double",
  ROUND = "round",
  BOLD = "bold",
  SINGLE_DOUBLE = "singleDouble",
  DOUBLE_SINGLE = "doubleSingle",
  CLASSIC = "classic",
}

export enum EBoxenAlignementName {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export interface IBoxenOptionAlignement {
  left?: EBoxenAlignementName.LEFT;
  center?: EBoxenAlignementName.CENTER;
  right?: EBoxenAlignementName.RIGHT;
}

export interface IBoxenOptionsPosition {
  top?: number;
  rigth?: number;
  bottom?: number;
  left?: number;
}

export interface IBoxenOptionsColor {
  black?: EBoxenColor.BLACK;
  red?: EBoxenColor.RED;
  green?: EBoxenColor.GREEN;
  yellow?: EBoxenColor.YELLOW;
  blue?: EBoxenColor.BLUE;
  magenta?: EBoxenColor.MAGENTA;
  cyan?: EBoxenColor.CYAN;
  white?: EBoxenColor.WHITE;
  gray?: EBoxenColor.GRAY;
}

export interface IBoxenOptions {
  title?: string;
  textAlignment?: IBoxenOptionAlignement;
  titleAlignment?: IBoxenOptionAlignement;
  float?: IBoxenOptionAlignement;
  margin?: number | IBoxenOptionsPosition;
  padding?: number | IBoxenOptionsPosition;
  dimBorder?: boolean;
  borderStyle?: EBoxenBorderStyle;
  backgroundColor?: IBoxenOptionsColor;
  borderColor?: IBoxenOptionsColor;
}
