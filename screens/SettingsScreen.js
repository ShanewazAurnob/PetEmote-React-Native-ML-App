import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryInfo from '../screens/CountryInfo';

const SettingsScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  useEffect(() => {
    setDarkModeEnabled(colorScheme === 'dark');
  }, [colorScheme]);

  const onToggleDarkMode = () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    // Save the new mode to AsyncStorage or your preferred storage
  };

  const onSignOutPress = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // Clear user data from AsyncStorage
      await auth.signOut();
      navigation.replace('LogIn'); // Navigate back to the login screen or wherever appropriate
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const handleGraphQl = () => {
    navigation.navigate('CountryInfo');
  };


  return (
    <View style={[styles.container, { backgroundColor: darkModeEnabled ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: darkModeEnabled ? '#ffffff' : '#000000' }]}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={[styles.setting, { borderColor: darkModeEnabled ? '#ffffff' : '#000000' }]}>
        <Text style={[styles.settingText, { color: darkModeEnabled ? '#ffffff' : '#000000' }]}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={onToggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {/* GraphQL Button */}
      <TouchableOpacity onPress={handleGraphQl} style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Graphql</Text>
        </TouchableOpacity>

      {/*Logout Button*/}
      <TouchableOpacity onPress={onSignOutPress}style={styles.commentButton}>
                  <Text style={styles.commentButtonText}>Logout</Text>
                </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  settingText: {
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 18,
    marginLeft: 10,
  },

  commentButton: {
    backgroundColor: '#4267B2',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 12,
  },
  commentButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',

  },
});

export default SettingsScreen;
