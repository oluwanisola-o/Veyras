import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordRequirements = ({ password = '' }) => {
  const requirements = [
    {
      text: 'at least one letter',
      met: /[a-zA-Z]/.test(password),
    },
    {
      text: 'at least one number',
      met: /\d/.test(password),
    },
    {
      text: '8 characters or more',
      met: password.length >= 8,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This password must contain:</Text>
      {requirements.map((requirement, index) => (
        <View key={index} style={styles.requirement}>
          <Icon
            name={requirement.met ? 'check' : 'close'}
            size={16}
            color={requirement.met ? '#4CAF50' : '#FF4444'}
            style={styles.icon}
          />
          <Text style={[
            styles.requirementText,
            requirement.met && styles.metRequirement
          ]}>
            {requirement.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontFamily: 'System',
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'System',
  },
  metRequirement: {
    color: '#4CAF50',
  },
});

export default PasswordRequirements;
