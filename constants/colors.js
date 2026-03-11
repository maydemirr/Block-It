export const COLORS = {
  background: '#0a0e27',
  gridBackground: '#1a1f3a',
  gridLine: '#2d3561',
  cell: '#2d3561',
  cellFilled: '#ff6b9d',
  shapes: [
    '#00f5ff', // Parlak cyan
    '#ff6b9d', // Parlak pembe
    '#4fffb0', // Parlak yeşil
    '#ffd93d', // Parlak sarı
    '#bd93f9', // Parlak mor
    '#ff6348', // Parlak turuncu
    '#6c5ce7', // Parlak mavi-mor
  ],
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  button: '#ff6b9d',
  buttonText: '#ffffff',
};

export const LIGHT_COLORS = {
  background: '#f5f5f5',
  gridBackground: '#ffffff',
  gridLine: '#e0e0e0',
  cell: '#e8e8e8',
  cellFilled: '#ff6b9d',
  shapes: [
    '#00d4ff', // Cyan
    '#ff6b9d', // Pembe
    '#00d98e', // Yeşil
    '#ffb800', // Sarı
    '#9b59b6', // Mor
    '#ff5733', // Turuncu
    '#5b4cdb', // Mavi-mor
  ],
  text: '#1a1a1a',
  textSecondary: '#666666',
  button: '#ff6b9d',
  buttonText: '#ffffff',
};

export const getColors = (isDark = true) => isDark ? COLORS : LIGHT_COLORS;

export const GRID_SIZE = 8;
export const CELL_SIZE = 40;
export const CELL_GAP = 2;
