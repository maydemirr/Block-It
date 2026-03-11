# Block Blast - Puzzle Oyunu

Block Blast tarzı profesyonel bir mobil puzzle oyunu. iOS ve Android için Expo SDK 52 ile geliştirildi.

## 🎮 Özellikler

### Temel Oyun Mekaniği
- 8x8 grid sistemi
- Sürükle-bırak ile şekil yerleştirme
- Tam satır/sütun temizleme
- 14 farklı şekil çeşidi
- Smooth animasyonlar
- Haptic feedback (titreşim)

### Oyun Özellikleri
- Skor sistemi
- High score kaydı (AsyncStorage)
- Oyun sonu ekranı
- Yeni rekor bildirimi
- Otomatik yeni şekil verme

### Teknik Özellikler
- React Native 0.76.9
- Expo SDK 52
- React Native Reanimated (animasyonlar)
- React Native Gesture Handler (sürükle-bırak)
- AsyncStorage (veri saklama)
- Expo Haptics (titreşim)

## 🚀 Kurulum

```bash
cd block-blast
npm install
```

## 📱 Çalıştırma

### Expo Go ile Test
```bash
npm start
```
Sonra Expo Go uygulamasında QR kodu tarayın.

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

## 💰 Para Kazanma Stratejisi

### Gelecek Özellikler (Faz 2)
1. **Reklam Entegrasyonu**
   - Banner reklamlar (oyun altında)
   - Interstitial reklamlar (oyun sonu)
   - Rewarded reklamlar (ekstra hamle için)
   - AdMob entegrasyonu

2. **In-App Purchases**
   - Reklamları kaldırma ($2.99)
   - Ekstra hamle paketi ($0.99)
   - Undo özelliği ($1.99)
   - Premium tema paketi ($4.99)

3. **Engagement Özellikleri**
   - Günlük ödüller
   - Başarımlar (achievements)
   - Leaderboard (sıralama tablosu)
   - Sosyal paylaşım

4. **Analytics**
   - Firebase Analytics
   - Kullanıcı davranış takibi
   - Retention metrikleri
   - A/B testing

## 📊 Proje Yapısı

```
block-blast/
├── components/          # React bileşenleri
│   ├── Grid.js         # 8x8 oyun grid'i
│   ├── Shape.js        # Sürüklenebilir şekiller
│   ├── ScoreBoard.js   # Skor gösterimi
│   └── GameOver.js     # Oyun sonu ekranı
├── utils/              # Yardımcı fonksiyonlar
│   ├── shapes.js       # Şekil tanımları
│   └── gameLogic.js    # Oyun mantığı
├── constants/          # Sabitler
│   └── colors.js       # Renkler ve boyutlar
└── App.js             # Ana uygulama
```

## 🎯 Oyun Kuralları

1. Alt tarafta 3 şekil görünür
2. Şekilleri sürükleyip grid'e yerleştirin
3. Tam satır veya sütun dolunca otomatik temizlenir
4. Her yerleştirme ve temizleme puan kazandırır
5. Hiçbir şekil yerleştirilemezse oyun biter

## 🎨 Renk Paleti

- Arka plan: #1a1a2e (koyu mavi)
- Grid: #16213e (orta mavi)
- Vurgu: #e94560 (kırmızı-pembe)
- Şekiller: 5 farklı canlı renk

## 📝 Skor Hesaplama

- Şekil yerleştirme: şekil boyutu × 10 puan
- Satır/sütun temizleme: 100 puan
- Combo bonusu: temizlenen satır sayısı × 50 puan

## 🔧 Geliştirme Notları

### Performans
- React Native Reanimated ile 60 FPS animasyon
- Optimize edilmiş render döngüsü
- Minimal re-render

### Kullanıcı Deneyimi
- Haptic feedback her etkileşimde
- Görsel geri bildirim (highlight)
- Smooth geçişler

## 📦 Yayınlama

### EAS Build ile Production Build
```bash
# EAS CLI kur
npm install -g eas-cli

# EAS hesabı oluştur
eas login

# Build yapılandır
eas build:configure

# iOS build
eas build --platform ios

# Android build
eas build --platform android
```

## 🎓 Öğrenilen Teknolojiler

- React Native gesture handling
- Reanimated animasyonlar
- AsyncStorage veri yönetimi
- Oyun mantığı algoritmaları
- Grid-based oyun geliştirme

## 📄 Lisans

Ticari kullanım için geliştirilmiştir.

## 👨‍💻 Geliştirici

Kiro AI Assistant ile geliştirildi.
