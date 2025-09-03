import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import Input from '../components/Input';
import LanguageSelector from '../components/LanguageSelector';
import { supabase } from '../../lib/supabase';

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'en',
    name: 'English (United States)',
    flag: '🇺🇸',
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isButtonEnabled = email.trim() !== '' && isValidEmail(email);

  const handleContinue = () => {
    if (isButtonEnabled) {
      navigation.navigate('SetupPassword', { email });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // For now, showing mock flow - Google OAuth would require additional setup
      Alert.alert(
        'Google Sign In',
        'Google authentication would be implemented here with Supabase OAuth.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Continue Demo',
            onPress: () => navigation.navigate('AboutBusiness'),
          },
        ]
      );
      // Future implementation:
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'google'
      // });
    } catch (error) {
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    }
  };

  const handleSignInAsCustomer = () => {
    Alert.alert('Sign in as Customer', 'This would navigate to customer flow');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>
            Create an account or login to book and manage your appointments.
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isButtonEnabled}
            style={styles.continueButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Continue with Google"
            onPress={handleGoogleSignIn}
            variant="secondary"
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
        </View>

        <TouchableOpacity
          style={styles.customerSignIn}
          onPress={handleSignInAsCustomer}
        >
          <Text style={styles.customerSignInText}>Sign in as a Customer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
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
  continueButton: {
    marginTop: 24,
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#999999',
    fontFamily: 'System',
  },
  googleButton: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#333333',
  },
  customerSignIn: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  customerSignInText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'System',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default CreateAccountScreen;
