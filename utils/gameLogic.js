import { GRID_SIZE } from '../constants/colors';

// Boş grid oluştur
export const createEmptyGrid = () => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
};

// Şekli grid'e yerleştirebilir mi kontrol et
export const canPlaceShape = (grid, shape, row, col) => {
  const pattern = shape.pattern;
  
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === 1) {
        const gridRow = row + i;
        const gridCol = col + j;
        
        // Grid sınırları dışında mı?
        if (gridRow < 0 || gridRow >= GRID_SIZE || gridCol < 0 || gridCol >= GRID_SIZE) {
          return false;
        }
        
        // Hücre dolu mu?
        if (grid[gridRow][gridCol] !== 0) {
          return false;
        }
      }
    }
  }
  
  return true;
};

// Şekli grid'e yerleştir
export const placeShape = (grid, shape, row, col, colorIndex) => {
  const newGrid = grid.map(row => [...row]);
  const pattern = shape.pattern;
  
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === 1) {
        newGrid[row + i][col + j] = colorIndex + 1;
      }
    }
  }
  
  return newGrid;
};

// Tam satır ve sütunları kontrol et
export const checkAndClearLines = (grid) => {
  let newGrid = grid.map(row => [...row]);
  let clearedCount = 0;
  let clearedCells = [];
  
  // Satırları kontrol et
  for (let i = 0; i < GRID_SIZE; i++) {
    if (newGrid[i].every(cell => cell !== 0)) {
      for (let j = 0; j < GRID_SIZE; j++) {
        clearedCells.push({ row: i, col: j });
      }
      newGrid[i] = Array(GRID_SIZE).fill(0);
      clearedCount++;
    }
  }
  
  // Sütunları kontrol et
  for (let j = 0; j < GRID_SIZE; j++) {
    let columnFull = true;
    for (let i = 0; i < GRID_SIZE; i++) {
      if (newGrid[i][j] === 0) {
        columnFull = false;
        break;
      }
    }
    if (columnFull) {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (!clearedCells.some(cell => cell.row === i && cell.col === j)) {
          clearedCells.push({ row: i, col: j });
        }
        newGrid[i][j] = 0;
      }
      clearedCount++;
    }
  }
  
  return { newGrid, clearedCount, clearedCells };
};

// Herhangi bir şekil yerleştirilebilir mi?
export const canPlaceAnyShape = (grid, shapes) => {
  for (const shape of shapes) {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (canPlaceShape(grid, shape, row, col)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Skor hesapla
export const calculateScore = (shapeSize, clearedLines) => {
  const baseScore = shapeSize * 10;
  const lineBonus = clearedLines * 100;
  const comboBonus = clearedLines > 1 ? clearedLines * 50 : 0;
  return baseScore + lineBonus + comboBonus;
};
