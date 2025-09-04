import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const ServicesSelectionScreen = ({ navigation, route }) => {
  const { address, coordinates } = route.params;
  const [selectedServices, setSelectedServices] = useState([]);

  const suggestedServices = [
    {
      id: 'correction-dyeing',
      name: 'Correction + dyeing',
      price: '€50 and up to 45mins',
    },
    {
      id: 'shp-cut-styling',
      name: 'Shp/Cut/Styling (short hair)',
      price: '€50 and up to 45mins',
    },
    {
      id: 'transformation-cut',
      name: 'Transformation cut',
      price: '€50 and up to 45mins',
    },
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleAddAll = () => {
    const allServiceIds = suggestedServices.map(service => service.id);
    setSelectedServices(allServiceIds);
  };

  const handleAddOwnServices = () => {
    navigation.navigate('AddCustomServices', {
      currentServices: selectedServices,
      address,
      coordinates
    });
  };

  const handleNext = () => {
    navigation.navigate('NextScreen', {
      services: selectedServices,
      address,
      coordinates
    });
  };

  const handleContinueLater = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1A1918" />
        </TouchableOpacity>
        <ProgressBar currentStep={7} totalSteps={7} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Add as many services as you offer</Text>
          <Text style={styles.subtitle}>
            The more services you add, the more likely you will get new clients
          </Text>
        </View>

        <View style={styles.infoBanner}>
          <Icon name="edit" size={20} color="#8D8A87" style={styles.infoIcon} />
          <Text style={styles.infoText}>You can edit and add more services later</Text>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested services</Text>
            <TouchableOpacity onPress={handleAddAll} style={styles.addAllButton}>
              <Text style={styles.addAllText}>Add All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesList}>
            {suggestedServices.map((service) => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceContent}>
                  <Icon name="drag-handle" size={20} color="#8D8A87" style={styles.dragHandle} />
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleServiceToggle(service.id)}
                    style={[
                      styles.addButton,
                      selectedServices.includes(service.id) && styles.addButtonSelected
                    ]}
                  >
                    <Icon 
                      name={selectedServices.includes(service.id) ? "check" : "add"} 
                      size={20} 
                      color={selectedServices.includes(service.id) ? "#FFFFFF" : "#EF6C4D"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={handleAddOwnServices} style={styles.addOwnServicesButton}>
            <Text style={styles.addOwnServicesText}>Add my Own Services</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />
          
          <TouchableOpacity onPress={handleContinueLater} style={styles.continueLaterButton}>
            <Text style={styles.continueLaterText}>Continue Later</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 40,
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#8D8A87',
    fontFamily: 'Geist',
    flex: 1,
  },
  servicesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1918',
    fontFamily: 'Geist',
  },
  addAllButton: {
    backgroundColor: '#EF6C4D',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Geist',
  },
  servicesList: {
    marginBottom: 24,
  },
  serviceItem: {
    marginBottom: 16,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  dragHandle: {
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1918',
    fontFamily: 'Geist',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#4A4846',
    fontFamily: 'Geist',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EF6C4D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addButtonSelected: {
    backgroundColor: '#EF6C4D',
    borderColor: '#EF6C4D',
  },
  addOwnServicesButton: {
    borderWidth: 1,
    borderColor: '#E0DDDB',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addOwnServicesText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1918',
    fontFamily: 'Geist',
  },
  buttonContainer: {
    paddingTop: 24,
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

export default ServicesSelectionScreen;
