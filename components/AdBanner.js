import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// AdMob sadece native build'de çalışır
let BannerAd, BannerAdSize, TestIds, mobileAds;
const HAS_ADMOB = Platform.OS !== 'web';

if (HAS_ADMOB) {
  try {
    const admob = require('react-native-google-mobile-ads');
    BannerAd = admob.BannerAd;
    BannerAdSize = admob.BannerAdSize;
    TestIds = admob.TestIds;
    mobileAds = admob.default;
  } catch (e) {
    console.log('AdMob not available');
  }
}

const AdBanner = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!HAS_ADMOB || !mobileAds) {
      console.log('AdMob not available, skipping initialization');
      return;
    }
    
    // AdMob'u başlat
    mobileAds()
      .initialize()
      .then(() => {
        setIsInitialized(true);
        console.log('AdMob initialized');
      })
      .catch((error) => {
        console.error('AdMob initialization error:', error);
      });
  }, []);

  // AdMob başlatılmadan veya mevcut değilse banner gösterme
  if (!HAS_ADMOB || !isInitialized || !BannerAd) {
    return null;
  }

  // Test ID'leri kullanıyoruz - gerçek uygulama için kendi AdMob ID'nizi kullanın
  const adUnitId = __DEV__ 
    ? TestIds.BANNER 
    : Platform.select({
        ios: 'ca-app-pub-4835192274036818/7331264179',
        android: 'ca-app-pub-4835192274036818/7331264179',
      });

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.error('Ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

export default AdBanner;
