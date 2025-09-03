import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';

const WorkLocationScreen = ({ navigation, route }) => {
  const { category, teamSize } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showNoLocationForm, setShowNoLocationForm] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);

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
    setSelectedLocation(locationId);
    setShowNoLocationForm(false);
    setShowAddressModal(false);

    if (locationId === 'no-street-location') {
      setShowNoLocationForm(true);
    } else if (locationId === 'at-my-place') {
      setShowAddressModal(true);
    }
  };

  const handleContinue = () => {
    if (selectedLocation) {
      const locationData = {
        type: selectedLocation,
        ...(selectedLocation === 'no-street-location' && { city, state, zipCode }),
        ...(selectedLocation === 'at-my-place' && { address }),
      };
      
      navigation.navigate('NextScreen', { 
        category, 
        teamSize, 
        location: locationData 
      });
    }
  };

  const handleContinueLater = () => {
    // Save progress and exit flow
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddressChange = (text) => {
    setAddress(text);
    // Mock address suggestions with realistic German addresses
    if (text.length > 2) {
      const mockSuggestions = [
        'Alexanderplatz 1, Berlin, Germany',
        'Potsdamer Platz 5, Berlin, Germany', 
        'Unter den Linden 10, Berlin, Germany',
        'Hackescher Markt 2, Berlin, Germany',
        'Kurfürstendamm 15, Berlin, Germany',
        'Prenzlauer Berg 8, Berlin, Germany',
        'Kreuzberg Straße 22, Berlin, Germany',
        'Charlottenburg Platz 7, Berlin, Germany'
      ];
      
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setAddressSuggestions(filtered);
    } else {
      setAddressSuggestions([]);
    }
  };

  const selectAddressSuggestion = (suggestion) => {
    setAddress(suggestion);
    setAddressSuggestions([]);
  };

  const isButtonEnabled = selectedLocation !== null && 
    (selectedLocation !== 'no-street-location' || (city && state && zipCode)) &&
    (selectedLocation !== 'at-my-place' || address);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <ProgressBar currentStep={4} totalSteps={5} />
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
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleContinue}
            disabled={!isButtonEnabled}
            style={styles.nextButton}
          />
          
          <Button
            title="Continue Later"
            onPress={handleContinueLater}
            variant="tertiary"
            style={styles.continueButton}
          />
        </View>
      </View>

      {/* Address Input Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowAddressModal(false)}
              style={styles.modalBackButton}
            >
              <Icon name="arrow-back" size={24} color="#333333" />
            </TouchableOpacity>
            <ProgressBar currentStep={4} totalSteps={5} />
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter your address</Text>
            <Text style={styles.modalSubtitle}>
              Let clients know where to meet you for your services
            </Text>

            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#999999" style={styles.searchIcon} />
              <Input
                placeholder="Search for service or business name"
                value={address}
                onChangeText={handleAddressChange}
                style={styles.addressInput}
              />
            </View>

            {addressSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {addressSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.suggestionItem,
                      index === 0 && styles.firstSuggestion
                    ]}
                    onPress={() => {
                      selectAddressSuggestion(suggestion);
                      setShowAddressModal(false);
                      navigation.navigate('AddressConfirmation', { selectedAddress: suggestion });
                    }}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.cantFindAddress}>
              <Text style={styles.cantFindText}>Can't find your address?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    fontFamily: 'System',
  },
  optionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    fontFamily: 'System',
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
    fontFamily: 'System',
    flex: 1,
  },
  locationForm: {
    marginBottom: 24,
    paddingLeft: 36,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 16,
    fontFamily: 'System',
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
    fontFamily: 'System',
  },
  selectedCardTitle: {
    color: '#EF6C4D',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'System',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  nextButton: {
    marginBottom: 16,
  },
  continueButton: {
    borderColor: '#EF6C4D',
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
  },
  modalBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: 'System',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'System',
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  suggestionItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  firstSuggestion: {
    backgroundColor: '#F8F8F8',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'System',
  },
  cantFindAddress: {
    marginTop: 24,
    alignItems: 'center',
  },
  cantFindText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'System',
  },
});

export default WorkLocationScreen;
