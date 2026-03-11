import React, { forwardRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, GRID_SIZE, CELL_SIZE, CELL_GAP } from '../constants/colors';

const Cell = ({ cell, isHighlighted, willClear, shouldFade }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (shouldFade) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [shouldFade]);

  return (
    <Animated.View
      style={[
        styles.cell,
        cell !== 0 && { backgroundColor: COLORS.shapes[cell - 1] },
        isHighlighted && styles.highlighted,
        willClear && styles.willClear,
        { opacity: fadeAnim },
      ]}
    />
  );
};

const Grid = forwardRef(({ grid, highlightCells = [], willClearCells = [], fadingCells = [] }, ref) => {
  const isHighlighted = (row, col) => {
    return highlightCells.some(cell => cell.row === row && cell.col === col);
  };

  const willClear = (row, col) => {
    return willClearCells.some(cell => cell.row === row && cell.col === col);
  };

  const shouldFade = (row, col) => {
    return fadingCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <View ref={ref} style={styles.container} collapsable={false}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              willClear={willClear(rowIndex, colIndex)}
              shouldFade={shouldFade(rowIndex, colIndex)}
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: COLORS.cell,
    margin: CELL_GAP / 2,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
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
