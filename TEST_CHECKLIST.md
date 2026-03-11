# ✅ Test Kontrol Listesi

## 🎮 Oyunu Başlat

```bash
cd block-blast
npm start
```

Expo Go'da QR kodu tara!

## 📋 Test Adımları

### 1. Temel Fonksiyonlar
- [ ] Oyun açılıyor mu?
- [ ] Grid görünüyor mu?
- [ ] 3 şekil alt tarafta mı?
- [ ] Skor 0'dan başlıyor mu?

### 2. Sürükle-Bırak
- [ ] Şekli tutabiliyorum
- [ ] Şekil büyüyor (scale animasyonu)
- [ ] Grid'de yeşil alan görünüyor
- [ ] Şekil yerleşiyor
- [ ] Titreşim hissediliyor

### 3. Oyun Mekaniği
- [ ] Şekil doğru yere yerleşiyor
- [ ] Tam satır temizleniyor
- [ ] Tam sütun temizleniyor
- [ ] Skor artıyor
- [ ] Yeni şekiller geliyor (3 şekil bitince)

### 4. Skor Sistemi
- [ ] Her yerleştirme puan veriyor
- [ ] Satır temizleme bonus veriyor
- [ ] Combo bonus çalışıyor
- [ ] High score kaydediliyor

### 5. Oyun Sonu
- [ ] Hiçbir şekil yerleştiremeyince oyun bitiyor
- [ ] "Oyun Bitti" ekranı çıkıyor
- [ ] Skor gösteriliyor
- [ ] High score gösteriliyor
- [ ] Yeni rekor varsa gösteriliyor
- [ ] "Yeniden Başla" çalışıyor

### 6. Animasyonlar
- [ ] Şekil sürüklerken smooth
- [ ] Yerleştirme animasyonu var
- [ ] Satır temizleme animasyonu var
- [ ] Oyun sonu animasyonu var

### 7. Haptic Feedback
- [ ] Şekil tutunca titreşim
- [ ] Yerleştirince titreşim
- [ ] Satır temizlenince titreşim
- [ ] Oyun bitince titreşim

### 8. Edge Cases
- [ ] Grid dolu olunca oyun bitiyor
- [ ] Yanlış yere bırakınca şekil geri dönüyor
- [ ] Aynı anda 2 satır temizlenebiliyor
- [ ] Aynı anda satır + sütun temizlenebiliyor

## 🐛 Bilinen Sorunlar

### Sorun 1: Sürükleme hassasiyeti
**Belirti:** Şekil tam grid hücresine oturmuyor
**Çözüm:** Normal, grid pozisyonu hesaplaması yaklaşık

### Sorun 2: İlk sürüklemede gecikme
**Belirti:** İlk şekli sürüklerken hafif gecikme
**Çözüm:** Normal, Expo Go'da olabilir, production'da yok

### Sorun 3: High score kaybolması
**Belirti:** Uygulama kapanınca high score sıfırlanıyor
**Çözüm:** AsyncStorage temizlenmiş, normal davranış

## 📱 Farklı Cihazlarda Test

### iPhone
- [ ] iPhone 12 ve üzeri
- [ ] iPhone SE (küçük ekran)
- [ ] iPad (tablet)

### Android
- [ ] Samsung Galaxy
- [ ] Google Pixel
- [ ] Xiaomi
- [ ] Tablet

## 🎯 Performans Testi

### FPS Kontrolü
- [ ] Animasyonlar smooth (60 FPS)
- [ ] Sürükleme gecikmiyor
- [ ] Grid render hızlı

### Memory Kullanımı
- [ ] Uygulama crash olmuyor
- [ ] Uzun süre oynayınca yavaşlamıyor
- [ ] Memory leak yok

## 💡 İyileştirme Önerileri

### Kullanıcı Feedback'i
1. Oyun çok kolay mı / zor mu?
2. Renkler hoş mu?
3. Animasyonlar yeterli mi?
4. Ses efekti eksikliği hissediliyor mu?
5. Tutorial gerekli mi?

### Potansiyel Eklemeler
- [ ] Ses efektleri
- [ ] Müzik
- [ ] Pause butonu
- [ ] Undo özelliği
- [ ] Tutorial ekranı
- [ ] Ayarlar menüsü

## 🚀 Production Hazırlık

### Teknik
- [ ] Tüm testler geçti
- [ ] Performans iyi
- [ ] Crash yok
- [ ] Memory leak yok

### İçerik
- [ ] App icon hazır
- [ ] Splash screen hazır
- [ ] Screenshots hazır
- [ ] App açıklaması yazıldı

### Yasal
- [ ] Privacy Policy hazır
- [ ] Terms of Service hazır
- [ ] GDPR uyumlu
- [ ] COPPA uyumlu

## 📊 Test Sonuçları

### Tarih: ___________
### Test Eden: ___________

#### Genel Değerlendirme
- Oynanabilirlik: __ / 10
- Performans: __ / 10
- Görsel: __ / 10
- Kullanıcı Deneyimi: __ / 10

#### Notlar:
```
[Buraya notlarınızı yazın]
```

#### Bulunan Buglar:
```
1. 
2. 
3. 
```

#### İyileştirme Önerileri:
```
1. 
2. 
3. 
```

## ✅ Onay

- [ ] Tüm testler başarılı
- [ ] Kritik bug yok
- [ ] Performans kabul edilebilir
- [ ] Kullanıcı deneyimi iyi

**Store'a yüklemeye hazır! 🚀**

---

**Sonraki Adım:** MONETIZATION_PLAN.md dosyasına bak
