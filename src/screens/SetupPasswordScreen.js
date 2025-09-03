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
import PasswordRequirements from '../components/PasswordRequirements';
import { supabase } from '../../lib/supabase';

const SetupPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (pwd) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasMinLength = pwd.length >= 8;
    return hasLetter && hasNumber && hasMinLength;
  };

  const isPasswordValid = validatePassword(password);
  const doPasswordsMatch = password === confirmPassword && confirmPassword !== '';
  const isButtonEnabled = isPasswordValid && doPasswordsMatch;

  const handleContinue = async () => {
    if (isButtonEnabled) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert(
            'Success!', 
            'Account created successfully. Please check your email to verify your account.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('AboutBusiness', { email, password, user: data.user })
              }
            ]
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    }
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
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Setup Password</Text>
          <Text style={styles.subtitle}>
            Setup a password for your business account
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            style={styles.input}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            style={styles.input}
          />

          <PasswordRequirements password={password} />

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isButtonEnabled}
            style={styles.continueButton}
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
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  continueButton: {
    marginTop: 40,
  },
});

export default SetupPasswordScreen;
