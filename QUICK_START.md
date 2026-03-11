# 🚀 Hızlı Başlangıç - Block Blast

## 1️⃣ Oyunu Çalıştır (2 dakika)

```bash
cd block-blast
npm start
```

Ekranda QR kod çıkacak. Telefonunuzda:
1. **iOS:** Camera uygulamasıyla QR kodu tara
2. **Android:** Expo Go uygulamasıyla QR kodu tara

**Expo Go yoksa:**
- iOS: App Store'dan "Expo Go" indir
- Android: Play Store'dan "Expo Go" indir

## 2️⃣ Oyunu Test Et (5 dakika)

### Kontrol Listesi:
- [ ] Oyun açılıyor mu?
- [ ] Şekilleri sürükleyebiliyor musun?
- [ ] Grid'e yerleşiyor mu?
- [ ] Satır temizleniyor mu?
- [ ] Skor artıyor mu?
- [ ] Oyun bitiyor mu?
- [ ] Yeniden başlatma çalışıyor mu?

### Oyun Nasıl Oynanır:
1. Alt tarafta 3 şekil var
2. Bir şekli tut ve sürükle
3. Grid'de yeşil alan görünce bırak
4. Tam satır veya sütun dolunca otomatik temizlenir
5. Hiçbir şekil yerleştiremezsen oyun biter

## 3️⃣ Kod Yapısını Anla (5 dakika)

```
block-blast/
├── App.js                 # Ana oyun mantığı
├── components/
│   ├── Grid.js           # 8x8 grid görünümü
│   ├── Shape.js          # Sürüklenebilir şekiller
│   ├── ScoreBoard.js     # Skor gösterimi
│   └── GameOver.js       # Oyun sonu ekranı
├── utils/
│   ├── shapes.js         # 14 farklı şekil tanımı
│   └── gameLogic.js      # Oyun kuralları
└── constants/
    └── colors.js         # Renkler ve boyutlar
```

## 4️⃣ Özelleştir (İsteğe Bağlı)

### Renkleri Değiştir
`constants/colors.js` dosyasını aç:
```javascript
export const COLORS = {
  background: '#1a1a2e',      // Arka plan rengi
  cellFilled: '#e94560',      // Dolu hücre rengi
  shapes: ['#00d9ff', ...],   // Şekil renkleri
};
```

### Grid Boyutunu Değiştir
```javascript
export const GRID_SIZE = 8;     // 8x8 grid (değiştirebilirsin)
export const CELL_SIZE = 40;    // Hücre boyutu
```

### Yeni Şekil Ekle
`utils/shapes.js` dosyasına:
```javascript
{
  id: 15,
  pattern: [[1, 1], [1, 0]],  // Kendi şeklini tasarla
  size: 3
}
```

## 5️⃣ Para Kazanmaya Başla

### Adım 1: AdMob Hesabı (Ücretsiz)
1. https://admob.google.com
2. Hesap oluştur
3. Uygulama ekle
4. Reklam birimleri oluştur

### Adım 2: Reklam Ekle
```bash
npm install react-native-google-mobile-ads
```

### Adım 3: Store'a Yükle
```bash
npm install -g eas-cli
eas build:configure
eas build --platform android
```

Detaylar için: `MONETIZATION_PLAN.md`

## 🐛 Sorun mu Var?

### Oyun açılmıyor
```bash
# Cache temizle
npm start -- --clear
```

### Sürükleme çalışmıyor
- Expo Go'nun güncel olduğundan emin ol
- Uygulamayı kapat ve tekrar aç

### Performans sorunu
- Development build kullan (Expo Go yerine)
- `constants/colors.js` içinde `CELL_SIZE` değerini küçült

### High score kayboldu
- Normal, AsyncStorage temizlenmiş olabilir
- Production'da bu sorun olmaz

## 📱 Gerçek Cihazda Test

### iOS (Mac gerekli)
```bash
npm run ios
```

### Android
```bash
npm run android
```

## 🎯 Sonraki Adımlar

1. ✅ Oyunu test et
2. 📝 Feedback topla (arkadaşlar, aile)
3. 🎨 Görsel iyileştirmeler yap
4. 💰 AdMob entegrasyonu
5. 📱 Store'a yükle
6. 🚀 Marketing başlat

## 💡 Hızlı İpuçları

- **Test et, test et, test et!** Farklı cihazlarda dene
- **Feedback önemli** - Kullanıcılar ne istiyor?
- **Basit tut** - Karmaşık özellikler sonra
- **Reklam dengesi** - Çok fazla reklam = kullanıcı kaybı
- **Sabırlı ol** - İlk ay zor geçebilir

## 📚 Öğrenme Kaynakları

- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **AdMob:** https://admob.google.com
- **YouTube:** "React Native game development"

## 🎉 Başarı İçin

1. **Kaliteli oyun yap** - Kullanıcı deneyimi #1
2. **Düzenli güncelle** - Her 2 haftada yeni özellik
3. **Community oluştur** - Discord, Reddit
4. **Analytics takip et** - Veri = para
5. **Sabırlı ol** - 6 ay sonuçları görmek için

---

**Hazır mısın? Hadi başlayalım! 🚀**

```bash
npm start
```

**Sorular?** README.md ve NEXT_STEPS.md dosyalarına bak!
