import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  const [name, setName] = useState('Shanewaz Aurnob');
  const [email, setEmail] = useState('aurnob101@gmail.com');
  const [password, setPassword] = useState('********');
  const [dob, setDob] = useState('2001-10-10');
  const [joinDate, setJoinDate] = useState('2024-02-20');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you can add logic to save the updated profile information
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
      />
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={isEditing}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={isEditing}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        editable={isEditing}
      />
      <Text style={styles.label}>Joining Date:</Text>
      <TextInput
        style={styles.input}
        value={joinDate}
        onChangeText={setJoinDate}
        editable={isEditing}
      />
      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={handleEdit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfilePage;
