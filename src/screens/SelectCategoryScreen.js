import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../components/ProgressBar';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 cards per row with 20px margins and 20px gap

const categories = [
  {
    id: 'men-salon',
    title: 'Men salon',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
  },
  {
    id: 'spa-treatments',
    title: 'Spa treatments',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  },
  {
    id: 'tattoo-piercing',
    title: 'Tattoo & piercing',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
  },
  {
    id: 'massage-therapy',
    title: 'Massage therapy',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
  },
  {
    id: 'hair-removal',
    title: 'Hair removal',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  },
  {
    id: 'massage',
    title: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  },
];

const SelectCategoryScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Navigate to next screen after selection
    setTimeout(() => {
      navigation.navigate('TeamSize', { category: categoryId });
    }, 200);
  };

  const handleOtherCategories = () => {
    navigation.navigate('TeamSize', { category: 'other' });
  };

  const handleBack = () => {
    navigation.navigate('AboutBusiness');
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCard
      ]}
      onPress={() => handleCategorySelect(category.id)}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: category.image }}
        style={styles.cardImage}
        imageStyle={styles.cardImageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          {selectedCategory === category.id && (
            <View style={styles.checkmark}>
              <Icon name="check" size={16} color="#FFFFFF" />
            </View>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <ProgressBar currentStep={2} totalSteps={5} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>What's your business category</Text>
          <Text style={styles.subtitle}>
            Select the category that best describe your business
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map(renderCategoryCard)}
          
          <TouchableOpacity
            style={[styles.categoryCard, styles.otherCategoriesCard]}
            onPress={handleOtherCategories}
            activeOpacity={0.8}
          >
            <View style={[styles.overlay, styles.otherCategoriesOverlay]}>
              <Text style={styles.categoryTitle}>Other categories</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomPadding} />
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  bottomPadding: {
    height: 40,
  },
  categoryCard: {
    width: cardWidth,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#EF6C4D',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(48, 22, 15, 0.6)',
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherCategoriesCard: {
    width: cardWidth,
    backgroundColor: '#30160F',
    marginBottom: 0,
  },
  otherCategoriesOverlay: {
    backgroundColor: '#30160F',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Geist',
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF6C4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectCategoryScreen;
