import React, { forwardRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { GRID_SIZE, CELL_SIZE, CELL_GAP, getColors } from '../constants/colors';

const Cell = ({ cell, isHighlighted, willClear, shouldFade, colors, previewColor }) => {
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

  const backgroundColor = cell !== 0 ? colors.shapes[cell - 1] : colors.cell;

  return (
    <Animated.View
      style={[
        styles.cell,
        { backgroundColor },
        isHighlighted && { backgroundColor: previewColor, opacity: 0.6 },
        willClear && styles.willClear,
        { opacity: fadeAnim },
      ]}
    />
  );
};

const Grid = forwardRef(({ grid, highlightCells = [], willClearCells = [], fadingCells = [], darkTheme = true, previewColor = '#00f5ff' }, ref) => {
  const colors = getColors(darkTheme);
  
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
    <View ref={ref} style={[styles.container, { backgroundColor: colors.gridBackground }]} collapsable={false}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              willClear={willClear(rowIndex, colIndex)}
              shouldFade={shouldFade(rowIndex, colIndex)}
              colors={colors}
              previewColor={previewColor}
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
    margin: CELL_GAP / 2,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  willClear: {
    borderWidth: 3,
    borderColor: '#ff6b9d',
  },
});

export default Grid;
