import React, { useId, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import firebase from 'firebase/app';
import { firestore } from '../config';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { firestore } from 'firebase/firestore';//////////////////////

const AboutUs = () => {
  const [rating, setRating] = useState(0);
  const randomId = useId();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const submitRating = () => {
    if (rating > 0) {
      // const db = firebase.firestore();
      setDoc(doc(firestore, "appRatings", randomId), {
        rating: rating,
        timestamp: serverTimestamp(),
        id: randomId,
      })
      .then(() => {
        console.log("Rating submitted successfully!");
        // Show pop-up notification here
        alert(`Thank you for your rating! You rated our app ${rating} stars.`);
      })
      .catch((error) => {
        console.error("Error submitting rating: ", error);
        // Show pop-up notification for error if needed
        alert('Error submitting rating. Please try again later.');
      });
    } else {
      // Handle case where user didn't select any rating
      // Show pop-up notification to prompt the user to select a rating
      alert('Please select a rating before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About PetEmote</Text>

        {/* Display YouTube Video */}
        <View style={styles.videoContainer}>
          <Text style={styles.subHeading}>YouTube Video</Text>
          <WebView
            style={styles.video}
            javaScriptEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/M2C9T34RFaQ' }}
          />
        </View>

        {/* Display Location on Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.subHeading}>Head Office Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 22.4716,
              longitude: 91.7877,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{ latitude: 22.4716, longitude: 91.7877 }}
              title="PetEmote"
              description="Head Office"
            />
          </MapView>
        </View>

        {/* Display Introduction */}
        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to PetEmote, where we bring the world of emotions closer to your furry companions!
          {/* Your introduction text goes here */}
        </Text>

        {/* Display Contact Information */}
        <Text style={styles.subHeading}>Contact Information</Text>
        <Text style={styles.paragraph}>
          Email: aurnob.shanewaz@gmail.com.{'\n'}
          Phone: +8801685-530730{'\n'}
          Address: 1no Gate of Chittagong University, Chittagong, Bangladesh.
        </Text>

        {/* Display Social Media Links */}
        <View style={styles.socialMediaContainer}>
          <Text style={styles.subHeading}>Social Media</Text>
          <View style={styles.socialMediaLinks}>
            <FontAwesome
              name="facebook-square"
              size={24}
              color="#3b5998"
              style={styles.icon}
              onPress={() => openLink('https://www.facebook.com/s.aurnob')}
            />
            <FontAwesome
              name="twitter-square"
              size={24}
              color="#00acee"
              style={styles.icon}
              onPress={() => openLink('hhttps://twitter.com/ShanewazAurnob')}
            />
            <FontAwesome
              name="instagram"
              size={24}
              color="#c13584"
              style={styles.icon}
              onPress={() => openLink('https://www.instagram.com/__aur_nob__/')}
            />
          </View>
        </View>

        {/* Display FAQs */}
        <Text style={styles.subHeading}>FAQs</Text>
        <Text style={styles.paragraph}>
          Q: What is PetEmote?{'\n'}
          A: PetEmote is a revolutionary app that helps you understand your pet's emotions better.
          {/* Add more FAQs and answers as needed */}
        </Text>

        {/* Rating Option */}
        <View style={styles.ratingContainer}>
          <Text style={styles.subHeading}>Rate Our App</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setRating(star)}
              >
                <FontAwesome
                  name={star <= rating ? "star" : "star-o"}
                  size={30}
                  color={star <= rating ? "#FFD700" : "#ccc"}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={submitRating}>
            <Text style={styles.submitButton}>Submit Rating</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e80505', // Changed color to a different color
    paddingTop: 30,
  },
  videoContainer: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#28a745'
  },
  video: {
    height: 200,
    width: Dimensions.get('window').width - 40,
  },
  mapContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    
    borderColor: '#e80505',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  socialMediaContainer: {
    marginTop: 20,
  },
  socialMediaLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 2,
  },
  submitButton: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff', // You can change the color to match your design
    textDecorationLine: 'underline',
  },
});

export default AboutUs;
