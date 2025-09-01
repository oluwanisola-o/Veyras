import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const languages = [
  { code: 'en', name: 'English (United States)', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector = ({ selectedLanguage, onLanguageSelect }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectLanguage = (language) => {
    onLanguageSelect(language);
    setModalVisible(false);
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => selectLanguage(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.languageName}>{item.name}</Text>
      {selectedLanguage.code === item.code && (
        <Icon name="check" size={24} color="#EF6C4D" />
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={styles.selector} onPress={toggleModal}>
        <Text style={styles.flag}>{selectedLanguage.flag}</Text>
        <Text style={styles.selectedLanguage}>{selectedLanguage.name}</Text>
        <Icon name="keyboard-arrow-down" size={24} color="#666666" />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="close" size={24} color="#666666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={languages}
            keyExtractor={(item) => item.code}
            renderItem={renderLanguageItem}
            style={styles.languageList}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  selectedLanguage: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'System',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'System',
  },
  languageList: {
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
    fontFamily: 'System',
  },
});

export default LanguageSelector;
