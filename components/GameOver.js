import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getColors } from '../constants/colors';

const GameOver = ({ visible, score, highScore, onRestart, darkTheme = true }) => {
  const isNewHighScore = score > highScore;
  const colors = getColors(darkTheme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.gridBackground }]}>
          <Text style={[styles.title, { color: colors.text }]}>OYUN BİTTİ!</Text>
          
          {isNewHighScore && (
            <Text style={[styles.newRecord, { color: colors.button }]}>🎉 YENİ REKOR! 🎉</Text>
          )}
          
          <View style={styles.scoreContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Skorunuz</Text>
            <Text style={[styles.score, { color: colors.text }]}>{ score}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>En Yüksek Skor</Text>
            <Text style={[styles.highScore, { color: colors.button }]}>{Math.max(score, highScore)}</Text>
          </View>
          
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={onRestart}>
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>YENİDEN BAŞLA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newRecord: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  highScore: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOver;
