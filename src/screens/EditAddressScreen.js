import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

const EditAddressScreen = ({ navigation, route }) => {
  const { currentAddress, coordinates, fromWorkLocation, workLocationData } = route.params;
  
  // Parse the current address
  const addressParts = currentAddress.split(', ');
  const [streetAddress, setStreetAddress] = useState(addressParts[0] || '');
  const [aptSuite, setAptSuite] = useState('');
  const [city, setCity] = useState(addressParts[1] || '');
  const [zipCode, setZipCode] = useState('');

  const handleSave = () => {
    const updatedAddress = `${streetAddress}${aptSuite ? `, ${aptSuite}` : ''}, ${city}${zipCode ? ` ${zipCode}` : ''}, ${addressParts[2] || 'Germany'}`;
    navigation.navigate('AddressConfirmation', {
      selectedAddress: updatedAddress,
      coordinates: coordinates,
      fromWorkLocation,
      workLocationData,
      editedData: {
        streetAddress,
        aptSuite,
        city,
        zipCode
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1A1918" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Edit business location</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Street address</Text>
              <TextInput
                style={styles.input}
                value={streetAddress}
                onChangeText={setStreetAddress}
                placeholder="Erasmusstraße"
                placeholderTextColor="#8D8A87"
              />
            </View>
            <View style={[styles.inputGroup, styles.inputGroupWithGap]}>
              <Text style={styles.label}>Apt/suite (0/100)</Text>
              <TextInput
                style={styles.input}
                value={aptSuite}
                onChangeText={setAptSuite}
                placeholder="Enter City"
                placeholderTextColor="#8D8A87"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Berlin"
              placeholderTextColor="#8D8A87"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zip code</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="10443"
              placeholderTextColor="#8D8A87"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1A1918',
    lineHeight: 32,
    fontFamily: 'Geist',
  },
  formSection: {
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#1A1918',
    fontFamily: 'Geist',
    marginBottom: 8,
  },
  inputGroupWithGap: {
    marginLeft: 24,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0DDDB',
    borderRadius: 28,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#4A4846',
    fontFamily: 'Geist',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  saveButton: {
    marginBottom: 16,
  },
});

export default EditAddressScreen;
