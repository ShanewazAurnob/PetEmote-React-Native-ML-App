import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Shanewaz Aurnob',
    email: 'aurnob.shanewaz@gmail.com',
    password: '*********',
    dateOfBirth: '',
    joiningDate: '01/01/2020',
    image: require('../assets/aa.jpg')
  });

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [birthDate, setBirthDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [birthDateModalStatus, setBirthDateModalStatus] = useState(false);

  const handleUpdate = () => {
    setUserData({
      ...userData,
      name: name,
      email: email,
      dateOfBirth: dateOfBirth
    });

    console.log('User data updated:', userData);
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image source={userData.image} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.changeImageButton} onPress={handleImagePick}>
        <Text style={styles.changeImageText}>Change Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Change Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Birth Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setBirthDateModalStatus(true)}>
        <Text>{birthDate}</Text>
      </TouchableOpacity>
      {birthDateModalStatus && (
        <DateTimePicker
          testID="dateTimePicker"
          value={moment(birthDate, 'DD/MM/YYYY').toDate()}
          mode="date"
          onChange={(e, date) => {
            const formattedDate = moment(date).format('DD/MM/YYYY');
            setBirthDate(formattedDate);
            setBirthDateModalStatus(false);
          }}
        />
      )}

      <Text style={styles.label}>Joining Date</Text>
      <Text style={styles.input}>{userData.joiningDate}</Text>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  
  },
  changeImageButton: {
    marginBottom: 10,
  },
  changeImageText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ProfileScreen;