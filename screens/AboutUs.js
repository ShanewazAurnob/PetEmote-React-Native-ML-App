import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const AboutUs = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About PetEmote</Text>

        <View style={styles.videoContainer}>
          <Text style={styles.subHeading}>YouTube Video</Text>
          <WebView
            style={styles.video}
            javaScriptEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/M2C9T34RFaQ' }}
          />
        </View>

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
              description="Head Office of PetEmote"
            />
          </MapView>
        </View>

        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to PetEmote, where we bring the world of emotions closer to your furry companions!
          {/* Your introduction text goes here */}
        </Text>

        <Text style={styles.subHeading}>Contact Information</Text>
        <Text style={styles.paragraph}>
          Email: aurnob.shanewaz@gmail.com.{'\n'}
          Phone: +8801685-530730{'\n'}
          Address: 1no Gate of Chittagong University, Chittagong, Bangladesh.
        </Text>

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

        <Text style={styles.subHeading}>FAQs</Text>
        <Text style={styles.paragraph}>
          Q: What is PetEmote?{'\n'}
          A: PetEmote is a revolutionary app that helps you understand your pet's emotions better.
          {/* Add more FAQs and answers as needed */}
        </Text>
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
});

export default AboutUs;
