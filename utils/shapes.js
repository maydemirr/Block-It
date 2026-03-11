// Şekil tanımları - her şekil bir 2D array
export const SHAPES = [
  // Tek kare
  { id: 1, pattern: [[1]], size: 1 },
  
  // 2x1 yatay
  { id: 2, pattern: [[1, 1]], size: 2 },
  
  // 1x2 dikey
  { id: 3, pattern: [[1], [1]], size: 2 },
  
  // 3x1 yatay
  { id: 4, pattern: [[1, 1, 1]], size: 3 },
  
  // 1x3 dikey
  { id: 5, pattern: [[1], [1], [1]], size: 3 },
  
  // 2x2 kare
  { id: 6, pattern: [[1, 1], [1, 1]], size: 4 },
  
  // L şekli
  { id: 7, pattern: [[1, 0], [1, 0], [1, 1]], size: 4 },
  
  // Ters L
  { id: 8, pattern: [[0, 1], [0, 1], [1, 1]], size: 4 },
  
  // T şekli
  { id: 9, pattern: [[1, 1, 1], [0, 1, 0]], size: 4 },
  
  // 3x3 kare
  { id: 10, pattern: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], size: 9 },
  
  // Küçük L
  { id: 11, pattern: [[1, 0], [1, 1]], size: 3 },
  
  // Z şekli
  { id: 12, pattern: [[1, 1, 0], [0, 1, 1]], size: 4 },
  
  // Ters Z
  { id: 13, pattern: [[0, 1, 1], [1, 1, 0]], size: 4 },
];

// Rastgele 3 şekil seç
export const getRandomShapes = () => {
  const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((shape, index) => ({
    ...shape,
    uniqueId: `${shape.id}-${Date.now()}-${index}`,
  }));
};
