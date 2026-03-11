import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const ScoreBoard = ({ score, highScore }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreBox}>
        <Text style={styles.label}>SKOR</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.label}>EN YÜKSEK</Text>
        <Text style={styles.score}>{highScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  scoreBox: {
    alignItems: 'center',
    backgroundColor: COLORS.gridBackground,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  score: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ScoreBoard;
