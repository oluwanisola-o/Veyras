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
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';

const AboutBusinessScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');

  const isButtonEnabled = name.trim() !== '' && businessName.trim() !== '';

  const handleNext = () => {
    if (isButtonEnabled) {
      navigation.navigate('SelectCategory'); 
      console.log('Proceeding to next step with:', { name, businessName });
    }
  };

  const handleContinueLater = () => {
    // Navigate to dashboard (will be implemented later)
    console.log('Continue later - navigate to dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <ProgressBar progress={1} totalSteps={5} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>About your business</Text>
          <Text style={styles.subtitle}>
            Tell us more about your business
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Input
            label="Business Name"
            placeholder="Enter your business name"
            value={businessName}
            onChangeText={setBusinessName}
            style={styles.input}
          />

          <Button
            title="Next"
            onPress={handleNext}
            disabled={!isButtonEnabled}
            style={styles.nextButton}
          />

          <Button
            title="Continue Later"
            onPress={handleContinueLater}
            variant="tertiary"
            style={styles.continueLaterButton}
          />
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
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressBar: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  nextButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  continueLaterButton: {
    marginBottom: 40,
  },
});

export default AboutBusinessScreen;
