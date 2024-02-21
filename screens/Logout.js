import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth'; // Assuming you have imported the signOut function from Firebase

const LogoutScreen = () => {

  const handleLogout = () => {
    // Call the signOut function to log out the user
    signOut(auth)
      .then(() => {
        // Log out successful
        console.log('User logged out successfully');
        // You can navigate to the login screen or perform any other actions here
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error logging out:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Logout</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
