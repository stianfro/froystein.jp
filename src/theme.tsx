import { createTheme } from '@mui/material/styles';

// Catppuccin Mocha color palette
// https://github.com/catppuccin/palette
const catppuccinMocha = {
  // Accent colors
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',

  // Neutral/Base colors
  text: '#cdd6f4',
  subtext1: '#bac2de',
  subtext0: '#a6adc8',
  overlay2: '#9399b2',
  overlay1: '#7f849c',
  overlay0: '#6c7086',
  surface2: '#585b70',
  surface1: '#45475a',
  surface0: '#313244',
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#11111b',
};

// A custom theme using Catppuccin Mocha palette
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: catppuccinMocha.blue,
      light: catppuccinMocha.sapphire,
      dark: catppuccinMocha.lavender,
    },
    secondary: {
      main: catppuccinMocha.teal,
      light: catppuccinMocha.sky,
      dark: catppuccinMocha.green,
    },
    error: {
      main: catppuccinMocha.red,
      light: catppuccinMocha.maroon,
      dark: catppuccinMocha.red,
    },
    warning: {
      main: catppuccinMocha.yellow,
      light: catppuccinMocha.peach,
    },
    info: {
      main: catppuccinMocha.sapphire,
      light: catppuccinMocha.sky,
    },
    success: {
      main: catppuccinMocha.green,
      light: catppuccinMocha.teal,
    },
    background: {
      default: catppuccinMocha.base,
      paper: catppuccinMocha.mantle,
    },
    text: {
      primary: catppuccinMocha.text,
      secondary: catppuccinMocha.subtext1,
      disabled: catppuccinMocha.overlay0,
    },
    divider: catppuccinMocha.surface0,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
