import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep = 1, totalSteps = 5, style }) => {
  const segments = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.segmentContainer}>
        {segments.map((segment, index) => (
          <View
            key={segment}
            style={[
              styles.segment,
              segment <= currentStep ? styles.activeSegment : styles.inactiveSegment,
              index < segments.length - 1 && styles.segmentSpacing
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 0,
  },
  segmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segment: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  activeSegment: {
    backgroundColor: '#EF6C4D',
  },
  inactiveSegment: {
    backgroundColor: '#F0F0F0',
  },
  segmentSpacing: {
    marginRight: 8,
  },
});

export default ProgressBar;
