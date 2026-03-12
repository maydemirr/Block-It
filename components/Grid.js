import React, { forwardRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { GRID_SIZE, CELL_SIZE, CELL_GAP, getColors } from '../constants/colors';

const Cell = ({ cell, isHighlighted, willClear, shouldFade, colors, previewColor }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const particles = useRef([
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 0 }),
  ]).current;

  useEffect(() => {
    if (shouldFade) {
      // Önce hafif büyüme sonra patlama
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          // Parçaları rastgele yönlere fırlat
          ...particles.map((particle, index) => {
            const angle = (index * 60) * Math.PI / 180;
            const distance = 30 + Math.random() * 20;
            return Animated.timing(particle, {
              toValue: {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
              },
              duration: 350,
              useNativeDriver: true,
            });
          }),
        ]),
      ]).start();
    } else {
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      particles.forEach(p => p.setValue({ x: 0, y: 0 }));
    }
  }, [shouldFade]);

  // WillClear için yanıp sönen animasyon
  useEffect(() => {
    if (willClear) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [willClear]);

  const backgroundColor = cell !== 0 ? colors.shapes[cell - 1] : colors.cell;

  if (shouldFade && cell !== 0) {
    // Kırılma animasyonu - 6 parça
    return (
      <View style={styles.cell}>
        {particles.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              { backgroundColor },
              {
                opacity: fadeAnim,
                transform: [
                  ...particle.getTranslateTransform(),
                  { scale: scaleAnim },
                  { rotate: `${index * 60}deg` },
                ],
              },
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.cell,
        { backgroundColor },
        isHighlighted && { backgroundColor: previewColor, opacity: 0.6 },
        willClear && {
          borderWidth: 4,
          borderColor: '#FFD700',
          transform: [{ scale: pulseAnim }],
        },
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
  particle: {
    position: 'absolute',
    width: CELL_SIZE / 2,
    height: CELL_SIZE / 2,
    borderRadius: 3,
  },
});

export default Grid;
