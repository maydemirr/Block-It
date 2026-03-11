# Para Kazanma Planı - Block Blast

## 💰 Gelir Modeli

### 1. Reklam Geliri (Ana Gelir Kaynağı)
**Tahmini Gelir:** $500-2000/ay (10K aktif kullanıcı ile)

#### Banner Reklamlar
- **Konum:** Oyun ekranı altında
- **Gösterim:** Sürekli
- **eCPM:** $0.50-2.00
- **Paket:** `expo-ads-admob` veya `react-native-google-mobile-ads`

#### Interstitial Reklamlar
- **Konum:** Oyun sonu ekranında
- **Gösterim:** Her oyun bitişinde
- **eCPM:** $3-8
- **Frekans:** Her 3 oyunda bir (kullanıcı deneyimi için)

#### Rewarded Video Reklamlar
- **Konum:** Oyun sonu "devam et" butonu
- **Ödül:** 1 ekstra hamle veya undo hakkı
- **eCPM:** $10-20
- **En karlı reklam türü!**

### 2. In-App Purchases (IAP)
**Tahmini Gelir:** $200-800/ay (10K kullanıcı, %2-5 conversion)

#### Premium Paketler
```javascript
const IAP_PRODUCTS = {
  removeAds: {
    id: 'com.blockblast.removeads',
    price: '$2.99',
    description: 'Tüm reklamları kaldır'
  },
  undoPack: {
    id: 'com.blockblast.undo5',
    price: '$0.99',
    description: '5 Undo hakkı'
  },
  extraMoves: {
    id: 'com.blockblast.moves10',
    price: '$0.99',
    description: '10 Ekstra hamle'
  },
  premiumTheme: {
    id: 'com.blockblast.theme',
    price: '$1.99',
    description: 'Premium temalar'
  },
  vipBundle: {
    id: 'com.blockblast.vip',
    price: '$9.99',
    description: 'Tüm özellikler + reklamsız'
  }
};
```

### 3. Engagement Stratejisi (Retention için)

#### Günlük Ödüller
- Gün 1: 100 puan bonus
- Gün 2: 200 puan bonus
- Gün 3: 1 undo hakkı
- Gün 7: 500 puan + özel tema

#### Başarımlar (Achievements)
- İlk 1000 puan: "Başlangıç" rozeti
- 10 oyun: "Kararlı" rozeti
- 5 combo: "Usta" rozeti
- Her rozet: 50 puan bonus

#### Leaderboard
- Haftalık sıralama
- Aylık sıralama
- Tüm zamanlar
- Top 10'a giren: özel ödül

## 📊 Uygulama Stratejisi

### Faz 1: Temel Oyun (✅ TAMAMLANDI)
- [x] Oyun mekaniği
- [x] Skor sistemi
- [x] High score
- [x] Animasyonlar
- [x] Haptic feedback

### Faz 2: Reklam Entegrasyonu (SONRAKİ ADIM)
```bash
# AdMob kurulumu
npx expo install expo-ads-admob
# veya
npm install react-native-google-mobile-ads
```

**Yapılacaklar:**
1. AdMob hesabı oluştur
2. Uygulama ID al
3. Reklam birimlerini oluştur
4. Test reklamları entegre et
5. Production'a geç

### Faz 3: In-App Purchases
```bash
# IAP kurulumu
npx expo install expo-in-app-purchases
```

**Yapılacaklar:**
1. App Store Connect / Google Play Console'da ürünler oluştur
2. IAP entegrasyonu
3. Satın alma akışı
4. Receipt validation

### Faz 4: Analytics & Optimization
```bash
# Firebase kurulumu
npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/analytics
```

**Takip Edilecek Metrikler:**
- DAU (Daily Active Users)
- Retention (D1, D7, D30)
- Session length
- ARPU (Average Revenue Per User)
- Ad impression rate
- IAP conversion rate

## 💡 Gelir Optimizasyonu İpuçları

### Reklam Stratejisi
1. **İlk 3 oyun reklamsız** - Kullanıcı bağımlılığı oluştur
2. **Rewarded ads'i öne çıkar** - En karlı reklam türü
3. **Banner'ı dikkatli kullan** - UX'i bozmamalı
4. **Interstitial frekansını ayarla** - Her oyunda değil, her 3-5 oyunda

### IAP Stratejisi
1. **"Remove Ads" en popüler** - $2.99 optimal fiyat
2. **Bundle indirim** - VIP paket %30 indirimli
3. **Limited time offers** - İlk 24 saat %50 indirim
4. **Oyun içi promosyon** - "Şimdi al, 2x puan kazan"

### Retention Stratejisi
1. **Push notifications** - "Günlük ödülün seni bekliyor!"
2. **Sosyal özellikler** - Arkadaşlarla yarış
3. **Düzenli güncellemeler** - Yeni şekiller, temalar
4. **Seasonal events** - Yılbaşı, Ramazan özel temaları

## 📈 Gelir Projeksiyonu

### Muhafazakar Senaryo (10K kullanıcı)
- Reklam geliri: $500/ay
- IAP geliri: $200/ay
- **Toplam: $700/ay**

### Orta Senaryo (50K kullanıcı)
- Reklam geliri: $2,500/ay
- IAP geliri: $1,000/ay
- **Toplam: $3,500/ay**

### İyimser Senaryo (100K kullanıcı)
- Reklam geliri: $5,000/ay
- IAP geliri: $2,500/ay
- **Toplam: $7,500/ay**

## 🎯 İlk 3 Ay Hedefleri

### Ay 1: Soft Launch
- 1,000 kullanıcı
- Temel reklamlar
- $50-100 gelir
- Feedback toplama

### Ay 2: Optimization
- 5,000 kullanıcı
- IAP ekleme
- $300-500 gelir
- A/B testing

### Ay 3: Scale
- 10,000+ kullanıcı
- Tam monetization
- $700-1,000 gelir
- Marketing başlat

## 🚀 Marketing Stratejisi

### Organik Büyüme
1. **ASO (App Store Optimization)**
   - Anahtar kelimeler: "block puzzle", "block blast", "puzzle game"
   - Çekici screenshots
   - Video preview

2. **Sosyal Medya**
   - TikTok gameplay videoları
   - Instagram Reels
   - YouTube Shorts

3. **Cross-Promotion**
   - Diğer oyunlarınızda tanıtım
   - Influencer işbirlikleri

### Ücretli Marketing (Gelir gelince)
1. **Facebook Ads** - $5-10/gün ile başla
2. **Google Ads** - App install campaigns
3. **TikTok Ads** - Genç kitle için

## 📱 Store Listing Optimizasyonu

### App Store / Google Play
**Başlık:** Block Blast - Puzzle Game
**Alt Başlık:** Addictive Block Puzzle Challenge
**Açıklama:**
```
🎮 Block Blast - En Bağımlılık Yapan Puzzle Oyunu!

Basit ama bağımlılık yapan! Şekilleri sürükle, grid'i doldur, satırları temizle!

✨ ÖZELLİKLER:
• Sınırsız oyun
• 14 farklı şekil
• Smooth animasyonlar
• Günlük ödüller
• Leaderboard
• Reklamsız mod

🎯 NASIL OYNANIR:
1. Şekilleri grid'e sürükle
2. Satır veya sütun doldur
3. Otomatik temizlenir
4. Yüksek skor yap!

Ücretsiz indir ve oynamaya başla! 🚀
```

**Anahtar Kelimeler:**
- block puzzle
- block blast
- puzzle game
- brain game
- block game
- tetris
- sudoku
- casual game

## 🔐 Yasal Gereksinimler

1. **Privacy Policy** - Zorunlu
2. **Terms of Service** - Zorunlu
3. **GDPR Compliance** - AB kullanıcıları için
4. **COPPA Compliance** - 13 yaş altı için
5. **Ad Consent** - Reklam için izin

## 📞 Destek

Sorularınız için: support@blockblast.com (örnek)

---

**NOT:** Bu plan gerçekçi tahminlere dayanır. Başarı, oyun kalitesi, marketing ve şansa bağlıdır. İlk 6 ay sabır gerektirir!
