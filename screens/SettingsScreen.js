import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../config';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = ({navigation}) => {
  const onSingOutPress= () => {
    auth.signOut();
    navigation.replace('LogIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <TouchableOpacity onPress={onSingOutPress} style={styles.miniNavigationBtn}>
                        
                    <Entypo name="log-out" size={25} color="#e80505" style={styles.miniNavigationIcon}/>
                  <Text style={styles.miniBtnText}>Log Out</Text>
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
miniNavigationBtn:{
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 8,
  width:'22%',
  height:70,
  alignItems:'center',
  justifyContent:'center',
  marginVertical:10,
  borderWidth:0.5,
  borderColor:'#e80505',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},
miniNavigationIcon:{
  width:'100%',
  textAlign:'center',
  marginBottom:2
},
miniBtnText: {
  fontSize: 12,
  textAlign:'center',
  fontWeight:'bold',
  color:'#e80505',
},

});

export default SettingsScreen;
