import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';

const AdBanner = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
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

  // AdMob başlatılmadan banner gösterme
  if (!isInitialized) {
    return null;
  }

  // Test ID'leri kullanıyoruz - gerçek uygulama için kendi AdMob ID'nizi kullanın
  const adUnitId = __DEV__ 
    ? TestIds.BANNER 
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyy', // iOS Banner ID
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyy', // Android Banner ID
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
