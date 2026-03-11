import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

import Grid from './components/Grid';
import Shape from './components/Shape';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import MainMenu from './components/MainMenu';

import { COLORS, CELL_SIZE, CELL_GAP } from './constants/colors';
import { getRandomShapes } from './utils/shapes';
import {
  createEmptyGrid,
  canPlaceShape,
  placeShape,
  checkAndClearLines,
  canPlaceAnyShape,
  calculateScore,
} from './utils/gameLogic';

const STORAGE_KEY = '@block_blast_high_score';

export default function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'classic', 'timed'
  const [isPaused, setIsPaused] = useState(false);
  const [grid, setGrid] = useState(createEmptyGrid());
  const [shapes, setShapes] = useState(getRandomShapes());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highlightCells, setHighlightCells] = useState([]);
  
  const gridRef = useRef(null);
  const gridPosition = useRef({ x: 0, y: 0 });
  const draggedShapeRef = useRef(null);
  const lastValidPosition = useRef(null);

  // High score yükle
  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setHighScore(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('High score yüklenemedi:', error);
    }
  };

  const saveHighScore = async (newScore) => {
    try {
      if (newScore > highScore) {
        await AsyncStorage.setItem(STORAGE_KEY, newScore.toString());
        setHighScore(newScore);
      }
    } catch (error) {
      console.error('High score kaydedilemedi:', error);
    }
  };

  // Grid pozisyonunu ölç
  const onGridLayout = () => {
    // Önce container'ı ölç
    if (gridRef.current) {
      setTimeout(() => {
        gridRef.current.measure((x, y, width, height, pageX, pageY) => {
          gridPosition.current = { x: pageX, y: pageY, width, height };
          console.log('Grid container position:', { pageX, pageY, width, height });
        });
      }, 100);
    }
  };

  // Sürükleme başladı
  const handleDragStart = (shape) => {
    draggedShapeRef.current = shape;
    console.log('Drag started with shape:', shape.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Sürükleme devam ediyor
  const handleDragMove = (blockX, blockY) => {
    const draggedShape = draggedShapeRef.current;
    
    if (!draggedShape) return;

    const { x: gridX, y: gridY } = gridPosition.current;
    
    if (!gridX && gridX !== 0) {
      return;
    }
    
    const cellTotalSize = CELL_SIZE + CELL_GAP;
    
    // Bloğun sol üst köşesinden grid koordinatlarına dönüştür
    // Grid'in padding'i 10
    const relativeX = blockX - gridX - 10;
    const relativeY = blockY - gridY - 10;
    
    // Hücre koordinatlarını hesapla
    const col = Math.round(relativeX / cellTotalSize);
    const row = Math.round(relativeY / cellTotalSize);

    // Şekil yerleştirilebilir mi kontrol et
    if (canPlaceShape(grid, draggedShape, row, col)) {
      const cells = [];
      draggedShape.pattern.forEach((patternRow, i) => {
        patternRow.forEach((cell, j) => {
          if (cell === 1) {
            cells.push({ row: row + i, col: col + j });
          }
        });
      });
      setHighlightCells(cells);
      lastValidPosition.current = { row, col, cells };
    } else {
      setHighlightCells([]);
      lastValidPosition.current = null;
    }
  };

  // Sürükleme bitti
  const handleDragEnd = () => {
    const draggedShape = draggedShapeRef.current;
    const validPosition = lastValidPosition.current;
    
    console.log('handleDragEnd:', { 
      hasDraggedShape: !!draggedShape, 
      hasValidPosition: !!validPosition,
      validPosition: validPosition
    });
    
    if (!draggedShape || !validPosition) {
      console.log('Cannot place - no shape or no valid position');
      draggedShapeRef.current = null;
      lastValidPosition.current = null;
      setHighlightCells([]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    console.log('Placing shape at:', validPosition);

    // Şekli yerleştir - shape'in orijinal rengini kullan
    const { row, col } = validPosition;
    const shapeColorIndex = shapes.findIndex(s => s.uniqueId === draggedShape.uniqueId);
    
    console.log('Shape color index:', shapeColorIndex);
    
    let newGrid = placeShape(grid, draggedShape, row, col, shapeColorIndex);
    
    console.log('Shape placed, checking lines...');
    
    // Satır/sütun kontrolü
    const { newGrid: clearedGrid, clearedCount } = checkAndClearLines(newGrid);
    
    console.log('Lines cleared:', clearedCount);
    
    // Skor hesapla
    const points = calculateScore(draggedShape.size, clearedCount);
    const newScore = score + points;
    setScore(newScore);
    saveHighScore(newScore);
    
    console.log('Score updated:', newScore);
    
    // Grid güncelle
    setGrid(clearedGrid);
    
    // Şekli kaldır
    const newShapes = shapes.filter(s => s.uniqueId !== draggedShape.uniqueId);
    
    console.log('Shapes before:', shapes.length, shapes.map(s => s.uniqueId));
    console.log('Shapes after:', newShapes.length, newShapes.map(s => s.uniqueId));
    console.log('Removed shape:', draggedShape.uniqueId);
    
    // Tüm şekiller kullanıldıysa yeni şekiller ver
    if (newShapes.length === 0) {
      const freshShapes = getRandomShapes();
      console.log('All shapes used, getting new shapes:', freshShapes.length);
      setShapes(freshShapes);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      console.log('Setting remaining shapes');
      setShapes(newShapes);
    }
    
    // Temizlik
    draggedShapeRef.current = null;
    lastValidPosition.current = null;
    setHighlightCells([]);
    
    // Haptic feedback
    if (clearedCount > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    console.log('handleDragEnd complete');
    
    // Oyun bitti mi kontrol et
    setTimeout(() => {
      checkGameOver(clearedGrid, newShapes.length === 0 ? getRandomShapes() : newShapes);
    }, 100);
  };

  const checkGameOver = (currentGrid, currentShapes) => {
    if (!canPlaceAnyShape(currentGrid, currentShapes)) {
      setGameOver(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleRestart = () => {
    setGrid(createEmptyGrid());
    setShapes(getRandomShapes());
    setScore(0);
    setGameOver(false);
    setHighlightCells([]);
    draggedShapeRef.current = null;
    lastValidPosition.current = null;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleStartClassic = () => {
    setGameMode('classic');
    setIsPaused(false);
    handleRestart();
  };

  const handleStartTimed = () => {
    setGameMode('timed');
    setIsPaused(false);
    handleRestart();
  };

  const handleBackToMenu = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  // Ana menü veya pause menüsü göster
  if (!gameMode || isPaused) {
    return (
      <MainMenu 
        onStartClassic={handleStartClassic} 
        onStartTimed={handleStartTimed}
        onResume={handleResume}
        hasActiveGame={gameMode && isPaused}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScoreBoard score={score} highScore={highScore} onBackToMenu={handleBackToMenu} />
      
      <View
        onLayout={onGridLayout}
        style={styles.gridContainer}
      >
        <Grid ref={gridRef} grid={grid} highlightCells={highlightCells} />
      </View>
      
      <View style={styles.shapesContainer}>
        {shapes.map((shape, index) => (
          <Shape
            key={`${shape.uniqueId}-${shapes.length}`}
            shape={shape}
            colorIndex={index}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            disabled={gameOver}
          />
        ))}
      </View>
      
      <GameOver
        visible={gameOver}
        score={score}
        highScore={highScore}
        onRestart={handleRestart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gridContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  shapesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
