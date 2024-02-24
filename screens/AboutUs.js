import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Linking, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import firebase from 'firebase/app';
import { firestore } from '../config';
import { collection, doc, serverTimestamp, setDoc, getDocs, query, orderBy } from 'firebase/firestore';

const AboutUs = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from Firestore
    const fetchReviews = async () => {
      const reviewsSnapshot = await getDocs(query(collection(firestore, 'reviews'), orderBy('timestamp', 'desc')));
      const reviewsData = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const submitRating = () => {
    if (rating > 0) {
      setDoc(doc(firestore, "appRatings", randomId), {
        rating: rating,
        timestamp: serverTimestamp(),
        id: randomId,
      })
      .then(() => {
        console.log("Rating submitted successfully!");
        alert(`Thank you for your rating! You rated our app ${rating} stars.`);
      })
      .catch((error) => {
        console.error("Error submitting rating: ", error);
        alert('Error submitting rating. Please try again later.');
      });
    } else {
      alert('Please select a rating before submitting.');
    }
  };

  const submitReview = () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return Alert.alert('Please sign in to leave a review.');
    }

    if (rating === 0) {
      return Alert.alert('Please provide a rating.');
    }

    const review = {
      userId: user.uid,
      rating,
      reviewText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    firebase.firestore().collection('reviews').add(review)
      .then(() => {
        Alert.alert('Thank you for your review!');
        setRating(0);
        setReviewText('');

        // After submitting a review, fetch the updated list of reviews
        fetchReviews();
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        Alert.alert('Error submitting review. Please try again later.');
      });
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
        

        {/* Review Option */}
        <View style={styles.reviewContainer}>
          <Text style={styles.subHeading}>Leave a Review</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setRating(star)}
              >
                <FontAwesome
                  name={star <= rating ? "star" : "star-o"}
                  size={40}
                  color={star <= rating ? "#FFD700" : "#ccc"}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            value={reviewText}
            onChangeText={text => setReviewText(text)}
            multiline
          />
          <Button title="Submit Review" onPress={submitReview} />
        </View>

        {/* Display existing reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.subHeading}>User Reviews</Text>
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <Text style={styles.reviewRating}>{`${review.rating} stars`}</Text>
              <Text style={styles.reviewText}>{review.reviewText}</Text>
            </View>
          ))}
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
    marginHorizontal: 5,
  },
  submitButton: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff', // You can change the color to match your design
    textDecorationLine: 'underline',
  },
  reviewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  reviewInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    textAlignVertical: 'top',
    width: '100%',
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
  },
});

export default AboutUs;