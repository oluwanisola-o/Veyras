import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';

const { width } = Dimensions.get('window');

const WorkLocationScreen = ({ navigation, route }) => {
  const { category, teamSize, selectedAddress, addressConfirmed, locationData } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showNoLocationForm, setShowNoLocationForm] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedAddressFromModal, setSelectedAddressFromModal] = useState(selectedAddress || null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle when returning from address modal
  useEffect(() => {
    if (selectedAddress && addressConfirmed && locationData?.type === 'at-my-place') {
      setSelectedLocation('at-my-place');
      setSelectedAddressFromModal(selectedAddress);
    }
  }, [selectedAddress, addressConfirmed, locationData]);

  const locationOptions = [
    {
      id: 'no-street-location',
      title: 'My business does not have a street location',
      type: 'radio',
    },
    {
      id: 'at-my-place',
      title: 'At my place',
      subtitle: 'I own my place and client come to me or I work in a share space for creatives that clients can come to for my services',
      type: 'card',
    },
    {
      id: 'mobile-office',
      title: 'Mobile office',
      subtitle: 'I perform my services on the go either in clients location or a meet point',
      type: 'card',
    },
  ];

  const handleLocationSelect = (locationId) => {
    if (selectedLocation === locationId && locationId === 'no-street-location') {
      setSelectedLocation(null);
      setShowNoLocationForm(false);
      return;
    }

    setSelectedLocation(locationId);
    setShowNoLocationForm(false);

    if (locationId === 'no-street-location') {
      setShowNoLocationForm(true);
    } else if (locationId === 'at-my-place') {
      // Clear search input and show modal
      setAddress('');
      setSuggestions([]);
      setShowSuggestions(false);
      setShowAddressModal(true);
    }
  };

  // Address modal functions
  const getAddressSuggestions = (input) => {
    const allSuggestions = [
      'Alexanderplatz 1, Berlin 10178, Germany',
      'Potsdamer Platz 10, Berlin 10785, Germany',
      'Unter den Linden 77, Berlin 10117, Germany',
      'Kurfürstendamm 26, Berlin 10719, Germany',
      'Hackescher Markt 2, Berlin 10178, Germany',
      'Warschauer Straße 58, Berlin 10243, Germany',
      'Friedrichstraße 107, Berlin 10117, Germany',
      'Prenzlauer Berg 15, Berlin 10405, Germany',
      'Kreuzberg 42, Berlin 10965, Germany',
      'Mitte 88, Berlin 10117, Germany',
      'Erasmusstraße, Berlin 10553, Germany',
      'Erasmusstraße, Dusseldorf 40233, Germany',
      'Erasmusstraße, Bremen 28199, Germany',
      'Erasmus-Grasser-Gymnasium, Fürstenrieder Straße, Bremen 28199, Germany'
    ];

    if (!input || input.length < 2) return [];
    
    return allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 6);
  };

  const handleAddressChange = (text) => {
    setAddress(text);
    const newSuggestions = getAddressSuggestions(text);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
  };

  const handleSuggestionSelect = (suggestion) => {
    setAddress(''); // Clear search input
    setSuggestions([]);
    setShowSuggestions(false);
    setShowAddressModal(false);
    
    // Navigate to AddressConfirmation
    navigation.navigate('AddressConfirmation', {
      selectedAddress: suggestion,
      coordinates: { lat: 52.5200, lng: 13.4050 },
      fromWorkLocation: true,
      workLocationData: { type: 'at-my-place' }
    });
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);
    setAddress(''); // Clear search input when closing modal
    setSuggestions([]);
    setShowSuggestions(false);
  };


  const handleContinue = () => {
    if (selectedLocation) {
      const locationData = {
        type: selectedLocation,
        city,
        state,
        zipCode,
        address,
      };
      navigation.navigate('ServicesSelection', { locationData });
    }
  };

  const handleContinueLater = () => {
    // Save progress and exit flow
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.navigate('TeamSize');
  };


  const isButtonEnabled = selectedLocation !== null && 
    (selectedLocation !== 'no-street-location' || (city && state && zipCode)) &&
    (selectedLocation !== 'at-my-place' || selectedAddressFromModal) &&
    (selectedLocation !== 'mobile-office' || true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <ProgressBar currentStep={4} totalSteps={5} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Where do you work?</Text>
          <Text style={styles.subtitle}>
            Let clients know where to meet you for your services.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          {/* No Street Location Radio */}
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => handleLocationSelect('no-street-location')}
            activeOpacity={0.8}
          >
            <View style={[
              styles.radioButton,
              selectedLocation === 'no-street-location' && styles.radioButtonSelected
            ]}>
              {selectedLocation === 'no-street-location' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text style={styles.radioText}>
              My business does not have a street location
            </Text>
          </TouchableOpacity>

          {/* Show location form when no street location is selected */}
          {showNoLocationForm && (
            <View style={styles.locationForm}>
              <Text style={styles.formLabel}>City</Text>
              <Input
                placeholder="Enter City"
                value={city}
                onChangeText={setCity}
                style={styles.formInput}
              />
              
              <Text style={styles.formLabel}>State</Text>
              <Input
                placeholder="Enter State"
                value={state}
                onChangeText={setState}
                style={styles.formInput}
              />
              
              <Text style={styles.formLabel}>Zip Code</Text>
              <Input
                placeholder="Enter Zip code"
                value={zipCode}
                onChangeText={setZipCode}
                style={styles.formInput}
              />
            </View>
          )}

          {/* Show cards only when no street location is NOT selected */}
          {selectedLocation !== 'no-street-location' && (
            <>
              {/* At My Place Card */}
              <TouchableOpacity
                style={[
                  styles.locationCard,
                  selectedLocation === 'at-my-place' && styles.selectedLocationCard
                ]}
                onPress={() => handleLocationSelect('at-my-place')}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.cardTitle,
                  selectedLocation === 'at-my-place' && styles.selectedCardTitle
                ]}>
                  At my place
                </Text>
                <Text style={styles.cardSubtitle}>
                  I own my place and client come to me or I work in a share space for creatives that clients can come to for my services
                </Text>
                {selectedAddressFromModal && selectedLocation === 'at-my-place' && (
                  <Text style={styles.selectedAddressText}>
                    {selectedAddressFromModal}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Mobile Office Card */}
              <TouchableOpacity
                style={[
                  styles.locationCard,
                  selectedLocation === 'mobile-office' && styles.selectedLocationCard
                ]}
                onPress={() => handleLocationSelect('mobile-office')}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.cardTitle,
                  selectedLocation === 'mobile-office' && styles.selectedCardTitle
                ]}>
                  Mobile office
                </Text>
                <Text style={styles.cardSubtitle}>
                  I perform my services on the go either in clients location or a meet point
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleContinue}
            disabled={!isButtonEnabled}
            style={styles.nextButton}
          />
          
          <TouchableOpacity onPress={handleContinueLater}>
            <Text style={styles.continueLaterText}>Continue Later</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Input Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Icon name="close" size={24} color="#1A1918" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter your address</Text>
            <Text style={styles.modalSubtitle}>
              Let clients know where to meet you for your services
            </Text>

            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#8D8A87" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for service or business name"
                placeholderTextColor="#8D8A87"
                value={address}
                onChangeText={handleAddressChange}
                autoFocus={true}
              />
            </View>

            {showSuggestions && suggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionSelect(suggestion)}
                  >
                    <Icon name="location-on" size={16} color="#8D8A87" style={styles.suggestionIcon} />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.cantFindAddress}>
              <Text style={styles.cantFindAddressText}>Can't find your address?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  progressBar: {
    marginBottom: 40,
    paddingHorizontal: 0,
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 32,
    fontFamily: 'Geist',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 24,
    fontFamily: 'Geist',
  },
  optionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    fontFamily: 'Geist',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#333333',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
  },
  radioText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Geist',
    flex: 1,
  },
  locationForm: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 16,
    fontFamily: 'Geist',
  },
  formInput: {
    marginBottom: 0,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedLocationCard: {
    borderColor: '#EF6C4D',
    backgroundColor: 'rgba(239, 108, 77, 0.05)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    fontFamily: 'Geist',
  },
  selectedCardTitle: {
    color: '#EF6C4D',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'Geist',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  nextButton: {
    marginBottom: 16,
  },
  continueLaterText: {
    fontSize: 16,
    color: '#30160F',
    textAlign: 'center',
    fontFamily: 'Geist',
    fontWeight: '600',
  },
  selectedAddressText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    fontFamily: 'Geist',
    fontStyle: 'italic',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1A1918',
    marginBottom: 8,
    lineHeight: 32,
    fontFamily: 'Geist',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4A4846',
    lineHeight: 24,
    fontFamily: 'Geist',
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#E0DDDB',
    borderRadius: 28,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A4846',
    fontFamily: 'Geist',
  },
  suggestionsContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 300,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1918',
    fontFamily: 'Geist',
  },
  cantFindAddress: {
    marginTop: 16,
  },
  cantFindAddressText: {
    fontSize: 16,
    color: '#30160F',
    fontFamily: 'Geist',
  },
});

export default WorkLocationScreen;
