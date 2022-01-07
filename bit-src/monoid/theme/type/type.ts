export interface Screens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export type Color =
  | 'white'
  | 'black'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';
export type ColorSaturation =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
export type LiteralColors = Partial<{
  [C in Color]: C extends 'white' | 'black'
    ? string
    : Partial<{
        [CS in ColorSaturation]: string;
      }>;
}>;

export interface Colors {
  primary:
    | string
    | {
        [key: string]: string;
      };
  secondary:
    | string
    | {
        [key: string]: string;
      };
}
export interface Theme {
  screens: Screens;
  colors: Colors;
}
