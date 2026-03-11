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
      <View style={styles.leftSection}>
        <View style={styles.highScoreBox}>
          <Text style={styles.highScoreLabel}>EN YÜKSEK</Text>
          <Text style={styles.highScoreText}>{highScore}</Text>
        </View>
      </View>
      
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
        <TouchableOpacity style={styles.menuButton} onPress={onBackToMenu}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: 90,
  },
  leftSection: {
    gap: 8,
  },
  rightSection: {
    gap: 8,
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
  highScoreBox: {
    alignItems: 'center',
    backgroundColor: COLORS.gridBackground,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  highScoreLabel: {
    color: '#FFD700',
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
  },
  highScoreText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainScore: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    textAlign: 'center',
  },
});

export default ScoreBoard;
