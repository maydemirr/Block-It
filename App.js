import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

import Grid from './components/Grid';
import Shape from './components/Shape';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import MainMenu from './components/MainMenu';
import ComboNotification from './components/ComboNotification';
import AdBanner from './components/AdBanner';

const USE_ADS = true; // AdMob aktif

import { COLORS, LIGHT_COLORS, CELL_SIZE, CELL_GAP, getColors } from './constants/colors';
import { getRandomShapes, getPlaceableShapes } from './utils/shapes';
import {
  createEmptyGrid,
  canPlaceShape,
  placeShape,
  checkAndClearLines,
  canPlaceAnyShape,
  calculateScore,
} from './utils/gameLogic';

const STORAGE_KEY = '@block_it_high_score';
const SETTINGS_KEY = '@block_it_settings';

export default function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'classic'
  const [isPaused, setIsPaused] = useState(false);
  const [grid, setGrid] = useState(createEmptyGrid());
  const [shapes, setShapes] = useState(getRandomShapes());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highlightCells, setHighlightCells] = useState([]);
  const [willClearCells, setWillClearCells] = useState([]);
  const [fadingCells, setFadingCells] = useState([]);
  const [combo, setCombo] = useState(0);
  const [showComboNotification, setShowComboNotification] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [previewColor, setPreviewColor] = useState('#00f5ff');
  const [continueCount, setContinueCount] = useState(0); // Kaç kere devam etti
  
  const gridRef = useRef(null);
  const gridPosition = useRef({ x: 0, y: 0 });
  const draggedShapeRef = useRef(null);
  const lastValidPosition = useRef(null);
  
  // Oyun bitmeden önceki durumu kaydet (reklam izleyip devam etmek için)
  const gameStateBeforeGameOver = useRef(null);

  // High score yükle
  useEffect(() => {
    loadHighScore();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved !== null) {
        const settings = JSON.parse(saved);
        setSoundEnabled(settings.soundEnabled ?? true);
        setHapticEnabled(settings.hapticEnabled ?? true);
        setDarkTheme(settings.darkTheme ?? true);
      }
    } catch (error) {
      console.error('Settings yüklenemedi:', error);
    }
  };

  const saveSettings = async (sound, haptic, dark) => {
    try {
      const settings = {
        soundEnabled: sound,
        hapticEnabled: haptic,
        darkTheme: dark,
      };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Settings kaydedilemedi:', error);
    }
  };

  // Settings değiştiğinde kaydet
  useEffect(() => {
    saveSettings(soundEnabled, hapticEnabled, darkTheme);
  }, [soundEnabled, hapticEnabled, darkTheme]);

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
  const handleDragStart = useCallback((shape) => {
    draggedShapeRef.current = shape;
    const colors = getColors(darkTheme);
    setPreviewColor(colors.shapes[shape.colorIndex]);
    console.log('Drag started with shape:', shape.id);
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [darkTheme, hapticEnabled]);

  // Sürükleme devam ediyor
  const handleDragMove = useCallback((blockX, blockY) => {
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
      
      // Şekil yerleştirilirse hangi satır/sütunlar temizlenecek kontrol et
      const tempGrid = placeShape(grid, draggedShape, row, col, 0);
      const { clearedCells } = checkAndClearLines(tempGrid);
      
      if (clearedCells && clearedCells.length > 0) {
        setWillClearCells(clearedCells);
      } else {
        setWillClearCells([]);
      }
    } else {
      setHighlightCells([]);
      setWillClearCells([]);
      lastValidPosition.current = null;
    }
  }, [grid]);

  // Sürükleme bitti
  const handleDragEnd = () => {
    try {
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
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        return;
      }

    console.log('Placing shape at:', validPosition);

    // Şekli yerleştir - shape'in orijinal rengini kullan
    const { row, col } = validPosition;
    const shapeColorIndex = draggedShape.colorIndex;
    
    console.log('Shape color index:', shapeColorIndex);
    
    // Yerleştirilen bloğun hücrelerini kaydet
    const placedCells = [];
    draggedShape.pattern.forEach((patternRow, i) => {
      patternRow.forEach((cell, j) => {
        if (cell === 1) {
          placedCells.push({ row: row + i, col: col + j });
        }
      });
    });
    
    let newGrid = placeShape(grid, draggedShape, row, col, shapeColorIndex);
    
    console.log('Shape placed, checking lines...');
    
    // Satır/sütun kontrolü
    const { newGrid: clearedGrid, clearedCount, clearedCells } = checkAndClearLines(newGrid);
    
    console.log('Lines cleared:', clearedCount);
    console.log('Placed cells:', placedCells);
    console.log('Cleared cells:', clearedCells);
    
    if (clearedCount > 0 && clearedCells && clearedCells.length > 0) {
      // Önce grid'i güncelle (yerleştirilen blok görünsün)
      setGrid(newGrid);
      
      // Fade animasyonunu başlat - tüm temizlenecek hücreleri kullan
      setFadingCells(clearedCells);
      
      // Animasyon bitince temizlenmiş grid'i uygula
      setTimeout(() => {
        setFadingCells([]);
        
        // Grid'i temizlenmiş haliyle güncelle
        setGrid(clearedGrid);
        
        // Kombo hesapla: önceki combo + kırılan satır/sütun sayısı (max 10)
        const newCombo = Math.min(combo + clearedCount, 10);
        setCombo(newCombo);
        
        // Kombo bildirimini göster
        setShowComboNotification(true);
        setTimeout(() => setShowComboNotification(false), 1400);
        
        // Grid tamamen temiz mi kontrol et
        const isGridEmpty = clearedGrid.every(row => row.every(cell => cell === 0));
        
        // Skor hesapla - kombo katsayısı ile
        const basePoints = calculateScore(draggedShape.size, clearedCount);
        const comboMultiplier = newCombo;
        const emptyGridBonus = isGridEmpty ? 1000 : 0;
        const totalPoints = (basePoints * comboMultiplier) + emptyGridBonus;
        
        const newScore = score + totalPoints;
        setScore(newScore);
        saveHighScore(newScore);
        
        console.log('Score updated:', newScore, 'Combo:', newCombo, 'Empty grid bonus:', emptyGridBonus);
        
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
          if (hapticEnabled) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        } else {
          console.log('Setting remaining shapes');
          setShapes(newShapes);
        }
        
        // Haptic feedback
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        // Oyun bitti mi kontrol et
        setTimeout(() => {
          checkGameOver(clearedGrid, newShapes.length === 0 ? getRandomShapes() : newShapes);
        }, 100);
      }, 350);
    } else {
      // Temizlenen satır yoksa direkt devam et ve komboyu sıfırla
      setCombo(0);
      
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
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } else {
        console.log('Setting remaining shapes');
        setShapes(newShapes);
      }
      
      // Haptic feedback
      if (hapticEnabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      // Oyun bitti mi kontrol et
      setTimeout(() => {
        checkGameOver(clearedGrid, newShapes.length === 0 ? getRandomShapes() : newShapes);
      }, 100);
    }
    
    // Temizlik
    draggedShapeRef.current = null;
    lastValidPosition.current = null;
    setHighlightCells([]);
    setWillClearCells([]);
    
    console.log('handleDragEnd complete');
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
      // Hata durumunda temizlik yap
      draggedShapeRef.current = null;
      lastValidPosition.current = null;
      setHighlightCells([]);
      setWillClearCells([]);
    }
  };

  const checkGameOver = (currentGrid, currentShapes) => {
    if (!canPlaceAnyShape(currentGrid, currentShapes)) {
      // Oyun bitmeden önceki durumu kaydet
      gameStateBeforeGameOver.current = {
        grid: currentGrid.map(row => [...row]), // Deep copy
        shapes: currentShapes.map(s => ({ ...s })), // Deep copy
        score: score,
        combo: combo,
      };
      
      setGameOver(true);
      if (hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const handleRestart = () => {
    setGrid(createEmptyGrid());
    setShapes(getRandomShapes());
    setScore(0);
    setCombo(0);
    setGameOver(false);
    setHighlightCells([]);
    setContinueCount(0); // Yeni oyun başladığında sıfırla
    draggedShapeRef.current = null;
    lastValidPosition.current = null;
    gameStateBeforeGameOver.current = null;
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  
  const handleContinue = () => {
    // Reklam izlendikten sonra grid aynı kalsın ama yerleştirilebilecek yeni bloklar gelsin
    if (gameStateBeforeGameOver.current) {
      const savedState = gameStateBeforeGameOver.current;
      setGrid(savedState.grid);
      setShapes(getPlaceableShapes(savedState.grid, canPlaceShape)); // Grid'e yerleştirilebilecek bloklar ver
      setScore(savedState.score);
      setCombo(savedState.combo);
      setGameOver(false);
      setHighlightCells([]);
      setContinueCount(continueCount + 1); // Devam sayısını artır
      draggedShapeRef.current = null;
      lastValidPosition.current = null;
      gameStateBeforeGameOver.current = null;
      
      if (hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      console.log('Game continued with placeable shapes after watching ad. Continue count:', continueCount + 1);
    }
  };

  const handleStartClassic = () => {
    setGameMode('classic');
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
        onResume={handleResume}
        hasActiveGame={gameMode && isPaused}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        hapticEnabled={hapticEnabled}
        setHapticEnabled={setHapticEnabled}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />
    );
  }

  const colors = getColors(darkTheme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"} />
      
      <ScoreBoard 
        score={score} 
        highScore={highScore} 
        onBackToMenu={handleBackToMenu}
        combo={combo}
        darkTheme={darkTheme}
      />
      
      <View
        onLayout={onGridLayout}
        style={styles.gridContainer}
      >
        <Grid ref={gridRef} grid={grid} highlightCells={highlightCells} willClearCells={willClearCells} fadingCells={fadingCells} darkTheme={darkTheme} previewColor={previewColor} />
      </View>
      
      <ComboNotification combo={combo} visible={showComboNotification} />
      
      <View style={styles.shapesContainer}>
        {shapes.map((shape) => (
          <Shape
            key={`${shape.uniqueId}-${shapes.length}`}
            shape={shape}
            colorIndex={shape.colorIndex}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            disabled={gameOver}
            darkTheme={darkTheme}
          />
        ))}
      </View>
      
      <GameOver
        visible={gameOver}
        score={score}
        highScore={highScore}
        onRestart={handleRestart}
        onContinue={USE_ADS && continueCount < 2 ? handleContinue : null}
        continueCount={continueCount}
        darkTheme={darkTheme}
      />
      
      {USE_ADS && <AdBanner />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
