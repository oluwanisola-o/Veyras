import React, { useState, useEffect } from 'react';
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
import ProgressBar from '../components/ProgressBar';

const AddressInputScreen = ({ navigation, route }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Check if this screen is being used from WorkLocation flow
  const fromWorkLocation = route.params?.fromWorkLocation || false;
  const workLocationData = route.params?.workLocationData;

  // Realistic address suggestions based on common German addresses
  const getAddressSuggestions = (input) => {
    const allSuggestions = [
      'Alexanderplatz 1, Berlin, Germany',
      'Potsdamer Platz 10, Berlin, Germany',
      'Unter den Linden 77, Berlin, Germany',
      'Kurfürstendamm 26, Berlin, Germany',
      'Hackescher Markt 2, Berlin, Germany',
      'Warschauer Straße 58, Berlin, Germany',
      'Friedrichstraße 107, Berlin, Germany',
      'Rosenthaler Straße 40, Berlin, Germany',
      'Kastanienallee 15, Berlin, Germany',
      'Torstraße 125, Berlin, Germany',
      'Auguststraße 69, Berlin, Germany',
      'Oranienburger Straße 32, Berlin, Germany',
      'Brunnenstraße 181, Berlin, Germany',
      'Invalidenstraße 43, Berlin, Germany',
      'Chausseestraße 86, Berlin, Germany'
    ];
    
    if (input.length < 2) return [];
    
    return allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 6);
  };

  useEffect(() => {
    if (address.length > 1) {
      const filtered = getAddressSuggestions(address);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address]);

  const handleAddressChange = (text) => {
    setAddress(text);
    setSelectedAddress(null);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSelectedAddress(suggestion);
    setAddress(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Navigate directly to confirmation screen
  };

  const handleContinue = () => {
    if (selectedAddress) {
      // Always proceed to AddressConfirmation with proper flow data
      navigation.navigate('AddressConfirmation', {
        selectedAddress: selectedAddress,
        coordinates: { lat: 52.5200, lng: 13.4050 },
        fromWorkLocation,
        workLocationData
      });
    }
  };

  const handleContinueLater = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    if (fromWorkLocation) {
      navigation.navigate('WorkLocation');
    } else {
      navigation.navigate('WorkLocation');
    }
  };

  const isButtonEnabled = selectedAddress !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1A1918" />
        </TouchableOpacity>
        <ProgressBar currentStep={5} totalSteps={7} style={styles.progressBar} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Enter your address</Text>
          <Text style={styles.subtitle}>
            Let clients know where to meet you for your services
          </Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#1A1918" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter your address"
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
                  <Icon name="location-on" size={20} color="#8D8A87" style={styles.locationIcon} />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {address.length > 2 && suggestions.length === 0 && (
            <TouchableOpacity style={styles.cantFindAddress}>
              <Text style={styles.cantFindText}>Can't find your address?</Text>
            </TouchableOpacity>
          )}
        </View>

        {selectedAddress && (
          <View style={styles.buttonContainer}>
            <Button
              title="Next"
              onPress={handleContinue}
              disabled={!isButtonEnabled}
              style={styles.nextButton}
            />
            
            <TouchableOpacity onPress={handleContinueLater} style={styles.continueLaterButton}>
              <Text style={styles.continueLaterText}>Continue Later</Text>
            </TouchableOpacity>
          </View>
        )}
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
  progressBar: {
    marginBottom: 40,
    paddingHorizontal: 0,
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
    color: '#1A1918',
    marginBottom: 8,
    lineHeight: 32,
    fontFamily: 'Geist',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4A4846',
    lineHeight: 24,
    fontFamily: 'Geist',
  },
  searchSection: {
    flex: 1,
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0DDDB',
    borderRadius: 28,
    paddingLeft: 44,
    paddingRight: 20,
    fontSize: 16,
    color: '#4A4846',
    fontFamily: 'Geist',
    backgroundColor: '#FFFFFF',
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  locationIcon: {
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1918',
    fontFamily: 'Geist',
  },
  cantFindAddress: {
    marginTop: 24,
    alignItems: 'flex-start',
  },
  cantFindText: {
    fontSize: 16,
    color: '#1A1918',
    fontFamily: 'Geist',
  },
  buttonContainer: {
    paddingTop: 40,
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
    textDecorationLine: 'underline',
  },
});

export default AddressInputScreen;
