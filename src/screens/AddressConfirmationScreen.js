import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const { width } = Dimensions.get('window');

const AddressConfirmationScreen = ({ navigation, route }) => {
  const { selectedAddress } = route.params;
  const [pinLocation, setPinLocation] = useState({ latitude: 52.5200, longitude: 13.4050 });

  // Parse address for display
  const addressParts = selectedAddress.split(', ');
  const street = addressParts[0] || '';
  const city = addressParts[1] || '';
  const country = addressParts[2] || '';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('ServicesSelection', { address: selectedAddress, location: pinLocation });
  };

  const handleEdit = () => {
    navigation.navigate('EditAddress', { selectedAddress });
  };

  const handleContinueLater = () => {
    navigation.navigate('Dashboard');
  };

  const handlePinDrag = (coordinate) => {
    setPinLocation(coordinate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1A1918" />
        </TouchableOpacity>
        <ProgressBar currentStep={5} totalSteps={6} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Enter your address</Text>
          
          <View style={styles.addressContainer}>
            <View style={styles.addressContent}>
              <Text style={styles.streetText}>{street}</Text>
              <Text style={styles.cityText}>{city}</Text>
              <Text style={styles.zipText}>10443, {city}</Text>
              <Text style={styles.countryText}>{country}</Text>
            </View>
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>Wrong location?</Text>
          <Text style={styles.instructionSubtitle}>Move the pin to the right location</Text>
        </View>

        <View style={styles.mapContainer}>
          <View style={styles.mockMap}>
            {/* Mock map with pins */}
            <View style={[styles.pin, { top: 120, left: 60 }]} />
            <View style={[styles.pin, styles.selectedPin, { top: 180, left: 200 }]} />
            <View style={[styles.pin, { top: 280, left: 320 }]} />
            
            {/* Mock map lines to simulate streets */}
            <View style={[styles.mapLine, { top: 100, left: 0, width: width - 40 }]} />
            <View style={[styles.mapLine, { top: 200, left: 0, width: width - 40 }]} />
            <View style={[styles.mapLine, { top: 300, left: 0, width: width - 40 }]} />
            <View style={[styles.mapLineVertical, { top: 0, left: 100, height: 350 }]} />
            <View style={[styles.mapLineVertical, { top: 0, left: 250, height: 350 }]} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />
          
          <TouchableOpacity onPress={handleContinueLater} style={styles.continueLaterButton}>
            <Text style={styles.continueLaterText}>Continue Later</Text>
          </TouchableOpacity>
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
    marginBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '600',
    color: '#1A1918',
    fontFamily: 'Geist',
    marginBottom: 24,
  },
  addressContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressContent: {
    flex: 1,
  },
  streetText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1918',
    marginBottom: 2,
  },
  cityText: {
    fontSize: 14,
    color: '#4A4846',
    marginBottom: 2,
  },
  zipText: {
    fontSize: 14,
    color: '#4A4846',
    marginBottom: 2,
  },
  countryText: {
    fontSize: 14,
    color: '#4A4846',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editText: {
    fontSize: 16,
    color: '#1A1918',
    fontWeight: '500',
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1918',
    marginBottom: 4,
  },
  instructionSubtitle: {
    fontSize: 14,
    color: '#4A4846',
  },
  mapContainer: {
    height: 350,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 40,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    position: 'relative',
  },
  pin: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#EF6C4D',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D63031',
  },
  mapLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#B8E6F0',
  },
  mapLineVertical: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#B8E6F0',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  nextButton: {
    marginBottom: 16,
  },
  continueLaterButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  continueLaterText: {
    fontSize: 16,
    color: '#30160F',
    textDecorationLine: 'underline',
  },
});

export default AddressConfirmationScreen;
