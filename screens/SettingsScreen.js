import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../config';

const SettingsScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    setDarkModeEnabled(colorScheme === 'dark');
  }, [colorScheme]);

  const onToggleDarkMode = () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    // Save the new mode to AsyncStorage or your preferred storage
    // You can use newMode to adjust your app's appearance
  };

  const onToggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
    // Implement logic for enabling/disabling notifications
  };

  const onSignOutPress = () => {
    auth.signOut();
    navigation.replace('LogIn');
  };

  return (
    <View style={[styles.container, { backgroundColor: darkModeEnabled ? '#222' : '#fff' }]}>
      <Text style={[styles.title, { color: darkModeEnabled ? '#fff' : '#000' }]}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={[styles.setting, { borderColor: darkModeEnabled ? '#fff' : '#000' }]}>
        <Text style={[styles.settingText, { color: darkModeEnabled ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={onToggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {/* Notifications Toggle */}
      <View style={[styles.setting, { borderColor: darkModeEnabled ? '#fff' : '#000' }]}>
        <Text style={[styles.settingText, { color: darkModeEnabled ? '#fff' : '#000' }]}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={onToggleNotifications}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={onSignOutPress} style={styles.button}>
        <Entypo name="log-out" size={25} color={darkModeEnabled ? '#fff' : '#000'} />
        <Text style={[styles.buttonTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Log Out</Text>
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
  title: {
    fontSize: 24,
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
    borderRadius: 5,
    padding: 10,
  },
  settingText: {
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e80505',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;
