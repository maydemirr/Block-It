import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Platform } from 'react-native';
import { getColors } from '../constants/colors';

// AdMob sadece native build'de çalışır
let RewardedAd, RewardedAdEventType, TestIds, InterstitialAd, AdEventType;
const HAS_ADMOB = Platform.OS !== 'web';

if (HAS_ADMOB) {
  try {
    const admob = require('react-native-google-mobile-ads');
    RewardedAd = admob.RewardedAd;
    RewardedAdEventType = admob.RewardedAdEventType;
    TestIds = admob.TestIds;
    InterstitialAd = admob.InterstitialAd;
    AdEventType = admob.AdEventType;
  } catch (e) {
    console.log('AdMob not available');
  }
}

const rewardedAdUnitId = __DEV__ && TestIds ? TestIds.REWARDED : 'ca-app-pub-4835192274036818/8452774155';
const interstitialAdUnitId = __DEV__ && TestIds ? TestIds.INTERSTITIAL : 'ca-app-pub-4835192274036818/4154436498';

const GameOver = ({ visible, score, highScore, onRestart, onContinue, continueCount = 0, darkTheme = true }) => {
  const [rewardedAd, setRewardedAd] = useState(null);
  const [interstitialAd, setInterstitialAd] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const isNewHighScore = score > highScore;
  const colors = getColors(darkTheme);
  const canContinue = continueCount < 2; // En fazla 2 kere devam edebilir

  useEffect(() => {
    if (visible && HAS_ADMOB && RewardedAd) {
      if (canContinue && !rewardedAd) {
        // İlk 2 oyun bitişinde rewarded ad yükle
        loadRewardedAd();
      } else if (!canContinue && !interstitialAd) {
        // 3. oyun bitişinde interstitial ad yükle ve göster
        loadAndShowInterstitialAd();
      }
    }
  }, [visible, canContinue]);

  const loadRewardedAd = () => {
    if (!HAS_ADMOB || !RewardedAd) return;
    
    try {
      setAdLoading(true);
      const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setAdLoaded(true);
        setAdLoading(false);
        console.log('Rewarded ad loaded');
      });

      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        (reward) => {
          console.log('User earned reward:', reward);
          if (onContinue) {
            onContinue();
          }
        }
      );

      const unsubscribeClosed = rewarded.addAdEventListener(
        RewardedAdEventType.CLOSED,
        () => {
          console.log('Rewarded ad closed');
          setRewardedAd(null);
          setAdLoaded(false);
        }
      );
      
      const unsubscribeError = rewarded.addAdEventListener(
        RewardedAdEventType.ERROR,
        (error) => {
          console.error('Rewarded ad error:', error);
          setAdLoading(false);
          setAdLoaded(false);
        }
      );

      rewarded.load();
      setRewardedAd(rewarded);

      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        unsubscribeError();
      };
    } catch (error) {
      console.error('Error loading rewarded ad:', error);
      setAdLoading(false);
      setAdLoaded(false);
    }
  };

  const loadAndShowInterstitialAd = () => {
    if (!HAS_ADMOB || !InterstitialAd) return;
    
    try {
      const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial ad loaded, showing...');
        try {
          interstitial.show();
        } catch (error) {
          console.error('Error showing interstitial:', error);
        }
      });

      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('Interstitial ad closed');
        setInterstitialAd(null);
      });
      
      const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('Interstitial ad error:', error);
        setInterstitialAd(null);
      });

      interstitial.load();
      setInterstitialAd(interstitial);

      return () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeError();
      };
    } catch (error) {
      console.error('Error loading interstitial ad:', error);
    }
  };

  const showRewardedAd = () => {
    if (adLoaded && rewardedAd) {
      try {
        rewardedAd.show();
      } catch (error) {
        console.error('Error showing rewarded ad:', error);
        setAdLoaded(false);
      }
    }
  };

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
          
          {onContinue && canContinue && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.continueButton, { opacity: adLoaded ? 1 : 0.5 }]} 
                onPress={showRewardedAd}
                disabled={!adLoaded}
              >
                {adLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>📺 REKLAM İZLE</Text>
                    <Text style={styles.buttonSubtext}>Devam Et ({2 - continueCount} hak kaldı)</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
          
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
  continueButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonSubtext: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
});

export default GameOver;
