import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep = 1, totalSteps = 5, style }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  track: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#EF6C4D',
    borderRadius: 2,
  },
});

export default ProgressBar;
