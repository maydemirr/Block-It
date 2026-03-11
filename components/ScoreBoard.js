import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { getColors } from '../constants/colors';

const ScoreBoard = ({ score, highScore, onBackToMenu, combo, darkTheme = true }) => {
  const colors = getColors(darkTheme);
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
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.highScoreBox}
        >
          <Text style={styles.crownIcon}>👑</Text>
          <Text style={styles.highScoreText}>{highScore}</Text>
        </LinearGradient>
      </View>
      
      <Animated.View
        style={[
          styles.mainScoreContainer,
          {
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <MaskedView
          maskElement={
            <Text style={styles.mainScore}>
              {displayScore}
            </Text>
          }
        >
          <LinearGradient
            colors={['#ff6b9d', '#00f5ff', '#4fffb0', '#ffd93d', '#bd93f9', '#ff6348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={[styles.mainScore, { opacity: 0 }]}>
              {displayScore}
            </Text>
          </LinearGradient>
        </MaskedView>
      </Animated.View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={[styles.menuButton, { backgroundColor: colors.gridBackground }]} onPress={onBackToMenu}>
          <Text style={[styles.menuButtonText, { color: colors.text }]}>☰</Text>
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
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  highScoreBox: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 70,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  crownIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  highScoreText: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainScoreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainScore: {
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 107, 157, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  gradient: {
    flex: 1,
  },
});

export default ScoreBoard;
