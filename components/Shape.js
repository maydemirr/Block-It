import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import { COLORS, CELL_SIZE, CELL_GAP } from '../constants/colors';

const Shape = ({ shape, colorIndex, onDragStart, onDragMove, onDragEnd, disabled }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const shapePosition = useRef({ x: 0, y: 0 });

  // Shape değiştiğinde Animated değerlerini sıfırla
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    scale.setValue(1);
    opacity.setValue(1);
  }, [shape.uniqueId, pan, scale, opacity]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e, gestureState) => {
        console.log('Shape drag started');
        // Şeklin başlangıç pozisyonunu kaydet
        shapePosition.current = {
          x: e.nativeEvent.pageX,
          y: e.nativeEvent.pageY
        };
        
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }).start();
        onDragStart(shape);
      },
      onPanResponderMove: (e, gestureState) => {
        // Y ekseninde -120 offset ekle (blok parmağın üstünde dursun)
        pan.setValue({ x: gestureState.dx, y: gestureState.dy - 120 });
        
        // Şeklin mevcut pozisyonunu hesapla (offset ile birlikte)
        const currentX = shapePosition.current.x + gestureState.dx;
        const currentY = shapePosition.current.y + gestureState.dy - 120;
        
        console.log('Shape moving:', { currentX, currentY, dx: gestureState.dx, dy: gestureState.dy });
        onDragMove(currentX, currentY);
      },
      onPanResponderRelease: () => {
        console.log('Shape drag ended');
        
        // Animasyonu iptal et ve hemen sıfırla
        pan.setValue({ x: 0, y: 0 });
        scale.setValue(1);
        
        // Kısa bir fade out animasyonu
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          // Animasyon bitince opacity'yi geri getir (yeni shape için)
          opacity.setValue(1);
        });
        
        onDragEnd();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
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
                  backgroundColor: COLORS.shapes[colorIndex],
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
    borderRadius: 4,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default Shape;
