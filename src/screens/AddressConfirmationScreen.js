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
  const { selectedAddress, coordinates, fromWorkLocation, workLocationData, editedData } = route.params;
  const [pinPosition, setPinPosition] = useState(coordinates);

  // Parse address for display - use edited data if available
  let street, city, zipCode, country;
  
  if (editedData) {
    street = editedData.streetAddress;
    city = editedData.city;
    zipCode = editedData.zipCode;
    country = 'Germany';
  } else {
    const addressParts = selectedAddress.split(', ');
    street = addressParts[0] || '';
    // Check if city contains zip code
    const cityPart = addressParts[1] || '';
    const cityMatch = cityPart.match(/^(.+?)\s+(\d{5})$/);
    if (cityMatch) {
      city = cityMatch[1];
      zipCode = cityMatch[2];
    } else {
      city = cityPart;
      zipCode = '';
    }
    country = addressParts[2] || '';
  }

  const handleEditAddress = () => {
    navigation.navigate('EditAddress', { 
      currentAddress: selectedAddress,
      coordinates: pinPosition,
      fromWorkLocation,
      workLocationData
    });
  };

  const handleNext = () => {
    if (fromWorkLocation) {
      // Navigate to ServicesSelection instead of back to WorkLocation
      navigation.navigate('ServicesSelection', {
        address: selectedAddress,
        coordinates: pinPosition,
        fromWorkLocation: true,
        workLocationData: { ...workLocationData, address: selectedAddress }
      });
    } else {
      // Continue normal flow to ServicesSelection
      navigation.navigate('ServicesSelection', {
        address: selectedAddress,
        coordinates: pinPosition
      });
    }
  };

  const handleContinueLater = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePinDrag = (newCoordinates) => {
    setPinPosition(newCoordinates);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1A1918" />
        </TouchableOpacity>
        <ProgressBar currentStep={6} totalSteps={7} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Confirm your address</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressContent}>
            <Text style={styles.streetAddress}>{street}</Text>
            <Text style={styles.cityAddress}>{city}</Text>
            {zipCode && <Text style={styles.cityAddress}>{zipCode}</Text>}
            <Text style={styles.cityAddress}>{country}</Text>
          </View>
          <TouchableOpacity onPress={handleEditAddress} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapSection}>
          <Text style={styles.mapInstructions}>
            Wrong location?
          </Text>
          <Text style={styles.mapSubInstructions}>
            Move the pin to the right location
          </Text>
          
          <View style={styles.mapContainer}>
            {/* Mock Map Component - In real app, use react-native-maps */}
            <View style={styles.mockMap}>
              <View style={styles.mapBackground}>
                {/* Mock street lines */}
                <View style={[styles.street, { top: 50, left: 0, width: '100%', height: 3 }]} />
                <View style={[styles.street, { top: 120, left: 0, width: '100%', height: 3 }]} />
                <View style={[styles.street, { top: 0, left: 80, width: 3, height: '100%' }]} />
                <View style={[styles.street, { top: 0, left: 150, width: 3, height: '100%' }]} />
                
                {/* Mock buildings */}
                <View style={[styles.building, { top: 20, left: 20, width: 50, height: 25 }]} />
                <View style={[styles.building, { top: 60, left: 100, width: 40, height: 30 }]} />
                <View style={[styles.building, { top: 90, left: 200, width: 35, height: 25 }]} />
                
                {/* Draggable Pin */}
                <TouchableOpacity 
                  style={[styles.pin, { 
                    top: 85,
                    left: 140
                  }]}
                  onPress={() => handlePinDrag({ lat: 52.5210, lng: 13.4060 })}
                >
                  <View style={styles.pinContainer}>
                    <View style={styles.pinDot} />
                    <View style={styles.pinStem} />
                  </View>
                </TouchableOpacity>
                
                {/* Additional pins for context */}
                <View style={[styles.contextPin, { top: 45, left: 60 }]}>
                  <View style={styles.contextPinDot} />
                </View>
                <View style={[styles.contextPin, { top: 130, left: 280 }]}>
                  <View style={styles.contextPinDot} />
                </View>
              </View>
            </View>
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
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  addressContent: {
    flex: 1,
  },
  streetAddress: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1918',
    fontFamily: 'Geist',
    marginBottom: 4,
    lineHeight: 22,
  },
  cityAddress: {
    fontSize: 17,
    color: '#4A4846',
    fontFamily: 'Geist',
    marginBottom: 2,
    lineHeight: 22,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 16,
    color: '#EF6C4D',
    fontFamily: 'Geist',
    fontWeight: '500',
  },
  mapSection: {
    marginBottom: 24,
  },
  mapInstructions: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1918',
    marginBottom: 4,
    fontFamily: 'Geist',
  },
  mapSubInstructions: {
    fontSize: 16,
    color: '#4A4846',
    marginBottom: 16,
    fontFamily: 'Geist',
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  mockMap: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    position: 'relative',
  },
  street: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  building: {
    position: 'absolute',
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
  },
  pin: {
    position: 'absolute',
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  pinContainer: {
    alignItems: 'center',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF6C4D',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pinStem: {
    width: 2,
    height: 8,
    backgroundColor: '#EF6C4D',
    marginTop: -1,
  },
  contextPin: {
    position: 'absolute',
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  contextPinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF6C4D',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonContainer: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  nextButton: {
    marginBottom: 16,
  },
  continueLaterButton: {
    alignItems: 'center',
  },
  continueLaterText: {
    fontSize: 16,
    color: '#30160F',
    fontFamily: 'Geist',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default AddressConfirmationScreen;
