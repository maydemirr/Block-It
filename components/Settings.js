import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Settings = ({ visible, onClose, soundEnabled, setSoundEnabled, hapticEnabled, setHapticEnabled, darkTheme, setDarkTheme }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['#87CEEB', '#FFFFFF', '#FFE4B5']}
        style={styles.overlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>⚙️ AYARLAR</Text>
          
          <View style={styles.settingsContainer}>
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🌙</Text>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingLabel}>Koyu Tema</Text>
                    <Text style={styles.settingDescription}>Karanlık mod</Text>
                  </View>
                </View>
                <Switch
                  value={darkTheme}
                  onValueChange={setDarkTheme}
                  trackColor={{ false: '#D3D3D3', true: '#90EE90' }}
                  thumbColor={darkTheme ? '#32CD32' : '#f4f3f4'}
                  ios_backgroundColor="#D3D3D3"
                />
              </View>
            </View>
            
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>🔊</Text>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingLabel}>Ses Efektleri</Text>
                    <Text style={styles.settingDescription}>Oyun sesleri</Text>
                  </View>
                </View>
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: '#D3D3D3', true: '#90EE90' }}
                  thumbColor={soundEnabled ? '#32CD32' : '#f4f3f4'}
                  ios_backgroundColor="#D3D3D3"
                />
              </View>
            </View>
            
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingIcon}>📳</Text>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingLabel}>Titreşim</Text>
                    <Text style={styles.settingDescription}>Dokunmatik geri bildirim</Text>
                  </View>
                </View>
                <Switch
                  value={hapticEnabled}
                  onValueChange={setHapticEnabled}
                  trackColor={{ false: '#D3D3D3', true: '#90EE90' }}
                  thumbColor={hapticEnabled ? '#32CD32' : '#f4f3f4'}
                  ios_backgroundColor="#D3D3D3"
                />
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.closeButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={styles.closeButtonText}>KAPAT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF69B4',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  settingsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  settingIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#888888',
  },
  closeButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButtonGradient: {
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default Settings;
