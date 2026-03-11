import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../constants/colors';

const MainMenu = ({ onStartClassic, onStartTimed, onResume, hasActiveGame }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Block It</Text>
        <Text style={styles.subtitle}>Puzzle Oyunu</Text>
        
        <View style={styles.buttonsContainer}>
          {hasActiveGame && (
            <TouchableOpacity 
              style={[styles.button, styles.resumeButton]} 
              onPress={onResume}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Devam Et</Text>
              <Text style={styles.buttonSubtext}>Oyuna geri dön</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={onStartClassic}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Klasik Mod</Text>
            <Text style={styles.buttonSubtext}>Zamansız oyna</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={onStartTimed}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Zamana Karşı</Text>
            <Text style={styles.buttonSubtext}>Süreyle yarış</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.textSecondary,
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
  primaryButton: {
    backgroundColor: COLORS.button,
  },
  resumeButton: {
    backgroundColor: '#00d9ff',
  },
  secondaryButton: {
    backgroundColor: '#4ecdc4',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.buttonText,
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    color: COLORS.buttonText,
    opacity: 0.8,
  },
});

export default MainMenu;
