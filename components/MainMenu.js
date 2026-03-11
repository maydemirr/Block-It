import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { getColors } from '../constants/colors';
import Settings from './Settings';

const MainMenu = ({ onStartClassic, onResume, hasActiveGame, soundEnabled, setSoundEnabled, hapticEnabled, setHapticEnabled, darkTheme, setDarkTheme }) => {
  const [showSettings, setShowSettings] = useState(false);
  const colors = getColors(darkTheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity 
        style={[styles.settingsButton, { backgroundColor: colors.gridBackground }]} 
        onPress={() => setShowSettings(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Block It</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Puzzle Oyunu</Text>
        
        <View style={styles.buttonsContainer}>
          {hasActiveGame && (
            <TouchableOpacity 
              style={[styles.button, styles.resumeButton]} 
              onPress={onResume}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Devam Et</Text>
              <Text style={[styles.buttonSubtext, { color: colors.buttonText }]}>Oyuna geri dön</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.button }]} 
            onPress={onStartClassic}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Oyunu Başlat</Text>
            <Text style={[styles.buttonSubtext, { color: colors.buttonText }]}>Klasik mod</Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  settingsIcon: {
    fontSize: 28,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 60,
  },
  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resumeButton: {
    backgroundColor: '#00d9ff',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default MainMenu;
