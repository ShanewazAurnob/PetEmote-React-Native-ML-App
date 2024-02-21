
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleCardDetection = () => {
    
    console.log('Navigate to Card Detection');
  };

  const handleViewPosts = () => {
  
    navigation.navigate('ViewPosts');
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.card} onPress={handleCardDetection}>
        <Text style={styles.cardTitle}>Pet Facial Expression</Text>
        <Text style={styles.cardDescription}>Detect and analyze pet facial expressions</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.card} onPress={handleViewPosts}>
        <Text style={styles.cardTitle}>View Posts</Text>
        <Text style={styles.cardDescription}>Explore and interact with posts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#1D2B53',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    width: '80%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  cardDescription: {
    fontSize: 16,
    padding: 10,
    color: '#555',
  },
});

export default HomeScreen;
