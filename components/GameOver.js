import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../constants/colors';

const GameOver = ({ visible, score, highScore, onRestart }) => {
  const isNewHighScore = score > highScore;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>OYUN BİTTİ!</Text>
          
          {isNewHighScore && (
            <Text style={styles.newRecord}>🎉 YENİ REKOR! 🎉</Text>
          )}
          
          <View style={styles.scoreContainer}>
            <Text style={styles.label}>Skorunuz</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.label}>En Yüksek Skor</Text>
            <Text style={styles.highScore}>{Math.max(score, highScore)}</Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={onRestart}>
            <Text style={styles.buttonText}>YENİDEN BAŞLA</Text>
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
    backgroundColor: COLORS.gridBackground,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newRecord: {
    color: COLORS.button,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  score: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: 'bold',
  },
  highScore: {
    color: COLORS.button,
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.button,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOver;
