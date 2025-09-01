import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  disabled = false, 
  variant = 'primary', 
  style,
  textStyle 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style
        ];
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledSecondaryButton,
          style
        ];
      case 'tertiary':
        return [
          styles.button,
          styles.tertiaryButton,
          disabled && styles.disabledTertiaryButton,
          style
        ];
      default:
        return [styles.button, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.buttonText,
          styles.primaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle
        ];
      case 'secondary':
        return [
          styles.buttonText,
          styles.secondaryButtonText,
          disabled && styles.disabledSecondaryButtonText,
          textStyle
        ];
      case 'tertiary':
        return [
          styles.buttonText,
          styles.tertiaryButtonText,
          disabled && styles.disabledTertiaryButtonText,
          textStyle
        ];
      default:
        return [styles.buttonText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: '#EF6C4D',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EF6C4D',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: '#EF6C4D',
    opacity: 0.3,
  },
  disabledSecondaryButton: {
    borderColor: '#EF6C4D',
    opacity: 0.3,
  },
  disabledTertiaryButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#EF6C4D',
  },
  tertiaryButtonText: {
    color: '#666666',
  },
  disabledButtonText: {
    color: '#FFFFFF',
  },
  disabledSecondaryButtonText: {
    color: '#EF6C4D',
  },
  disabledTertiaryButtonText: {
    color: '#666666',
  },
});

export default Button;
