import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import { CELL_SIZE, CELL_GAP, getColors } from '../constants/colors';

const Shape = ({ shape, colorIndex, onDragStart, onDragMove, onDragEnd, disabled, darkTheme = true }) => {
  const colors = getColors(darkTheme);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const shapePosition = useRef({ x: 0, y: 0 });
  const shapeRef = useRef(null);

  // Shape değiştiğinde Animated değerlerini sıfırla
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    scale.setValue(1);
    opacity.setValue(1);
    
    // Shape'in gerçek pozisyonunu ölç
    if (shapeRef.current) {
      shapeRef.current.measure((x, y, width, height, pageX, pageY) => {
        shapePosition.current = { x: pageX, y: pageY };
      });
    }
  }, [shape.uniqueId, pan, scale, opacity]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e, gestureState) => {
        console.log('Shape drag started');
        // Shape'in gerçek pozisyonunu al
        if (shapeRef.current) {
          shapeRef.current.measure((x, y, width, height, pageX, pageY) => {
            shapePosition.current = { x: pageX, y: pageY };
          });
        }
        
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }).start();
        onDragStart(shape);
      },
      onPanResponderMove: (e, gestureState) => {
        const Y_OFFSET = -150; // Blok parmağın üstünde dursun
        
        // Görsel pozisyon (offset ile)
        pan.setValue({ x: gestureState.dx, y: gestureState.dy + Y_OFFSET });
        
        // Bloğun sol üst köşesinin pozisyonunu hesapla (görsel offset ile)
        const topLeftX = shapePosition.current.x + gestureState.dx;
        const topLeftY = shapePosition.current.y + gestureState.dy + Y_OFFSET;
        
        onDragMove(topLeftX, topLeftY);
      },
      onPanResponderRelease: () => {
        console.log('Shape drag ended');
        
        // Animasyonu iptal et ve hemen sıfırla
        pan.setValue({ x: 0, y: 0 });
        scale.setValue(1);
        
        onDragEnd();
      },
    })
  ).current;

  return (
    <Animated.View
      ref={shapeRef}
      {...panResponder.panHandlers}
      collapsable={false}
      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: scale },
          ],
          opacity: opacity,
        },
        disabled && styles.disabled,
      ]}
    >
      {shape.pattern.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                cell === 1 && {
                  backgroundColor: colors.shapes[colorIndex],
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderRightWidth: 4,
                  borderBottomWidth: 4,
                  borderTopColor: 'rgba(255, 255, 255, 0.5)',
                  borderLeftColor: 'rgba(255, 255, 255, 0.5)',
                  borderRightColor: 'rgba(0, 0, 0, 0.4)',
                  borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                },
                cell === 0 && styles.emptyCell,
              ]}
            />
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE * 0.8,
    height: CELL_SIZE * 0.8,
    margin: CELL_GAP / 2,
    borderRadius: 0,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default Shape;
