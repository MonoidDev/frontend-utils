export interface TailwindConfig {
  darkMode: 'class' | 'media';
  theme: object;
  plugins: any[];
}

export const config: TailwindConfig = {
  darkMode: 'class',
  theme: {},
  plugins: [],
};
