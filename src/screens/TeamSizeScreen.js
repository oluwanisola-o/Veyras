import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const teamSizeOptions = [
  { id: 'only-me', title: 'Only me' },
  { id: '2-5-people', title: '2-5 people' },
  { id: '6-above', title: '6 Above' },
];

const TeamSizeScreen = ({ navigation, route }) => {
  const { category } = route.params || {};
  const [selectedTeamSize, setSelectedTeamSize] = useState(null);

  const handleTeamSizeSelect = (teamSizeId) => {
    setSelectedTeamSize(teamSizeId);
    // Auto-navigate to next screen
    navigation.navigate('WorkLocation', { 
      category, 
      teamSize: teamSizeId 
    });
  };

  const handleContinueLater = () => {
    navigation.navigate('Dashboard');
  };

  const handleContinue = () => {
    if (selectedTeamSize) {
      navigation.navigate('WorkLocation', { 
        category, 
        teamSize: selectedTeamSize 
      });
    }
  };

  const handleBack = () => {
    navigation.navigate('SelectCategory');
  };

  const isButtonEnabled = selectedTeamSize !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <ProgressBar currentStep={3} totalSteps={5} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>How many team do you have?</Text>
          <Text style={styles.subtitle}>
            Select the category that best describe your business
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {teamSizeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedTeamSize === option.id && styles.selectedOption
              ]}
              onPress={() => handleTeamSizeSelect(option.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.optionText,
                selectedTeamSize === option.id && styles.selectedOptionText
              ]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
        </View>
      </View>
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
    fontFamily: 'Geist',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    fontFamily: 'Geist',
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#EF6C4D',
    backgroundColor: 'rgba(239, 108, 77, 0.05)',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: '#EF6C4D',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF6C4D',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Geist',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#EF6C4D',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  continueLaterText: {
    fontSize: 16,
    color: '#30160F',
    textAlign: 'center',
    fontFamily: 'Geist',
    fontWeight: '400',
  },
});

export default TeamSizeScreen;
