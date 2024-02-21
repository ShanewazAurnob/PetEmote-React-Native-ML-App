import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const onSingOutPress= () => {
    navigation.replace('LogOut');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <TouchableOpacity
                       
                        style={styles.button}
                        onPress={() => onSingOutPress()}>
                        <Text style={styles.buttonTitle}>
                           Lou out
                        </Text>
                    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold"
},
button: {
  backgroundColor: '#e80505',
  marginLeft: 30,
  marginRight: 30,
  marginTop: 20,
  height: 48,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center'
},

});

export default SettingsScreen;
