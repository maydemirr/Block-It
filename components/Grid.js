import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, GRID_SIZE, CELL_SIZE, CELL_GAP } from '../constants/colors';

const Grid = forwardRef(({ grid, highlightCells = [], willClearCells = [] }, ref) => {
  const isHighlighted = (row, col) => {
    return highlightCells.some(cell => cell.row === row && cell.col === col);
  };

  const willClear = (row, col) => {
    return willClearCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <View ref={ref} style={styles.container} collapsable={false}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                cell !== 0 && { backgroundColor: COLORS.shapes[cell - 1] },
                isHighlighted(rowIndex, colIndex) && styles.highlighted,
                willClear(rowIndex, colIndex) && styles.willClear,
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
});

Grid.displayName = 'Grid';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gridBackground,
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: COLORS.cell,
    margin: CELL_GAP / 2,
    borderRadius: 4,
  },
  highlighted: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  willClear: {
    borderWidth: 3,
    borderColor: '#ffffff',
    opacity: 0.8,
  },
});

export default Grid;
