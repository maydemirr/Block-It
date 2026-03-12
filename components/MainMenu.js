import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './Settings';

const BouncingLetter = ({ letter, color, delay = 0 }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 8],
  });

  return (
    <Animated.Text
      style={[
        styles.logoLetter,
        { color, transform: [{ translateX }] }
      ]}
    >
      {letter}
    </Animated.Text>
  );
};

const RotatingGear = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text style={[styles.iconButtonText, { transform: [{ rotate }] }]}>
      ⚙️
    </Animated.Text>
  );
};

const MainMenu = ({ onStartClassic, onResume, hasActiveGame, soundEnabled, setSoundEnabled, hapticEnabled, setHapticEnabled, darkTheme, setDarkTheme }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const saved = await AsyncStorage.getItem('@block_it_high_score');
      if (saved !== null) {
        setHighScore(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('High score yüklenemedi:', error);
    }
  };

  useEffect(() => {
    const shake = () => {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    };

    const interval = setInterval(shake, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={['#87CEEB', '#FFFFFF', '#FFE4B5']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* High Score */}
      <View style={styles.highScoreContainer}>
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.highScoreBox}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.crownIcon}>👑</Text>
          <Text style={styles.highScoreText}>{highScore}</Text>
        </LinearGradient>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoRow}>
          <BouncingLetter letter="B" color="#FFD700" delay={0} />
          <BouncingLetter letter="L" color="#FF69B4" delay={100} />
          <BouncingLetter letter="O" color="#FF69B4" delay={200} />
          <BouncingLetter letter="C" color="#87CEEB" delay={300} />
          <BouncingLetter letter="K" color="#90EE90" delay={400} />
          <Text style={[styles.logoLetter, { color: '#FFFFFF', marginHorizontal: 8 }]}> </Text>
          <BouncingLetter letter="I" color="#FFD700" delay={500} />
          <BouncingLetter letter="T" color="#FFA500" delay={600} />
        </View>
        <Text style={styles.subtitleText}>PUZZLE</Text>
      </View>

      {/* Play Button */}
      <TouchableOpacity 
        style={styles.playButton}
        onPress={hasActiveGame ? onResume : onStartClassic}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.playButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.Text style={[styles.playButtonText, { transform: [{ translateX: shakeAnim }] }]}>
            PLAY
          </Animated.Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => setShowSettings(true)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#90EE90', '#32CD32']}
            style={styles.iconButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <RotatingGear />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Settings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        hapticEnabled={hapticEnabled}
        setHapticEnabled={setHapticEnabled}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  highScoreContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  highScoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  crownIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  highScoreText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
  },
  logoLetter: {
    fontSize: 64,
    fontWeight: '900',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
    letterSpacing: 8,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  playButton: {
    width: 280,
    height: 100,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  playButtonGradient: {
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  playButtonText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 30,
  },
  iconButton: {
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconButtonGradient: {
    flex: 1,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  iconButtonText: {
    fontSize: 40,
  },
});

export default MainMenu;
