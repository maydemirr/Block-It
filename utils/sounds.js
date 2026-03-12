import { Audio } from 'expo-av';

// Ses objeleri
const sounds = {
  place: null,
  clear: null,
  combo: null,
  gameOver: null,
};

// Sesleri yükle
export const loadSounds = async () => {
  try {
    // Basit ses efektleri için frekans kullanacağız
    // Gerçek ses dosyaları eklenene kadar placeholder
    console.log('Ses sistemi hazır');
  } catch (error) {
    console.error('Sesler yüklenemedi:', error);
  }
};

// Blok yerleştirme sesi (kısa tık)
export const playPlaceSound = async (enabled) => {
  if (!enabled) return;
  // TODO: Gerçek ses dosyası eklenecek
};

// Satır temizleme sesi (yüksek tık)
export const playClearSound = async (enabled) => {
  if (!enabled) return;
  // TODO: Gerçek ses dosyası eklenecek
};

// Kombo sesi (melodik)
export const playComboSound = async (enabled, comboLevel) => {
  if (!enabled) return;
  // TODO: Gerçek ses dosyası eklenecek
};

// Oyun bitti sesi (düşük ton)
export const playGameOverSound = async (enabled) => {
  if (!enabled) return;
  // TODO: Gerçek ses dosyası eklenecek
};

// Ses sistemini başlat
export const initAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  } catch (error) {
    console.error('Ses sistemi başlatılamadı:', error);
  }
};
