import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../constants/colors';

const ScoreBoard = ({ score, highScore, onBackToMenu, combo }) => {
  const [displayScore, setDisplayScore] = useState(score);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevScoreRef = useRef(score);

  useEffect(() => {
    const prevScore = prevScoreRef.current;
    
    if (score !== prevScore) {
      const diff = score - prevScore;
      const duration = 400;
      const steps = Math.min(Math.abs(diff), 30); // Max 30 adım
      const increment = diff / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(prevScore + (increment * currentStep)));
        }
      }, stepDuration);

      // Büyüme animasyonu
      scaleAnim.setValue(1);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      prevScoreRef.current = score;

      return () => clearInterval(interval);
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={onBackToMenu}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>
      
      <Animated.Text 
        style={[
          styles.mainScore,
          {
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {displayScore}
      </Animated.Text>
      
      <View style={styles.rightSection}>
        <View style={styles.smallBox}>
          <Text style={styles.smallLabel}>EN YÜKSEK</Text>
          <Text style={styles.smallScore}>{highScore}</Text>
        </View>
        <View style={[styles.smallBox, styles.comboBox]}>
          <Text style={styles.smallLabel}>KOMBO</Text>
          <Text style={styles.smallScore}>{combo > 0 ? combo : ''}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: 90,
  },
  menuButton: {
    backgroundColor: COLORS.gridBackground,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  mainScore: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  rightSection: {
    marginLeft: 'auto',
    gap: 8,
  },
  smallBox: {
    alignItems: 'center',
    backgroundColor: COLORS.gridBackground,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  comboBox: {
    backgroundColor: '#ff6b6b',
  },
  smallLabel: {
    color: COLORS.textSecondary,
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
  },
  smallScore: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScoreBoard;
