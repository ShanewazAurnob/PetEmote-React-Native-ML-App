import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, ActivityIndicator, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Added state to manage password visibility
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [welcomeUserName, setWelcomeUserName] = useState('');

    const signIn = async () => {
        try {
            setLoading(true);
            setEmail(email.trim());

            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                intermediateSignUp(user);
                navigation.replace('AppNav'); // Navigate to the home screen
            })
            .catch((e) => {
                if(e.code==='auth/invalid-email') setErrorMessage("Invalid Email.")
                if (e.code === 'auth/invalid-credential' || e.code ==='auth/invalid-login-credentials') setErrorMessage("Invalid Credentials");
                if(e.code==='auth/too-many-requests') setErrorMessage("Please try again later.")
                if (e.code === 'auth/user-not-found') setErrorMessage('No account matches this email');
                else console.log(e);
                setLoading(false);
            });
            setLoading(false);
        } catch (e) {
            if (e.code === 'auth/invalid-credential') setErrorMessage("Wrong Password");
            if (e.code === 'auth/user-not-found') setErrorMessage('No account matches this email');
            else console.log(e);
            setLoading(false);
        }
    };

    const intermediateSignUp = async (user) => {
        if (user.emailVerified) {
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const { userName, user_id, email, dp_url } = userData;
                const loggedUserInfo = {
                    userRef: user_id,
                    userEmail: email,
                    userName: userName,
                    userProfilePic: dp_url
                };
                setWelcomeUserName(userName);
                if (isRememberMeChecked == true) {
                    const loggedUserInfoString = JSON.stringify(loggedUserInfo);
                    AsyncStorage.setItem('userData', loggedUserInfoString)
                        .then(() => {
                            console.log('Data stored successfully!');
                        })
                        .catch((error) => {
                            console.log('Error storing data:', error);
                        });
                }
                setEmail('');
                setPassword('');
                setLoading(false);
                setLoggedInStatus(true);
            });
        } else {
            alert("Please verify your email first.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/L2.png')}
            />
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => { setEmail(text); setErrorMessage(''); }}
                value={email}
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={!showPassword}
                    placeholder='Password'
                    onChangeText={(text) => { setPassword(text); setErrorMessage('') }}
                    value={password}
                    autoCapitalize="none"
                />
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#aaaaaa" />
                        </TouchableOpacity>

            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    status={isRememberMeChecked ? 'checked' : 'unchecked'}
                    onPress={() => {setIsRememberMeChecked(!isRememberMeChecked);}}
                    color={isRememberMeChecked ? '#e80909' : undefined}
                />
                <Text onPress={() => {setIsRememberMeChecked(!isRememberMeChecked);}} style={styles.checkboxLabel}>Remember me</Text>
            </View>
            {errorMessage.length > 0 && <Text style={styles.errorMessage}>*{errorMessage}*</Text>}
            <TouchableOpacity
                disabled={password.length == 0 || email.length == 0}
                style={styles.button}
                onPress={signIn}>
                <Text style={styles.buttonTitle}>
                    {loading ? <ActivityIndicator size={18} color={"#fff"} /> : "Log in"}
                </Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <Text onPress={() => {
                    setEmail('');
                    setPassword('');
                    setErrorMessage('')
                    navigation.navigate('SignUp')
                }} style={styles.footerLink}>Sign up</Text></Text>
            </View>
            <Modal
                visible={loggedInStatus}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Ionicons name="md-person" size={64} color="#e80505" />
                        <Text style={styles.welcomeText}>
                            Welcome, <Text style={styles.usernameText}>{welcomeUserName}</Text>
                        </Text>
                        <TouchableOpacity style={styles.cancelButton}
                            onPress={() => {
                                setLoggedInStatus(false);
                                navigation.replace('Home');
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Enter the Area 51</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 150,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0066cc',
        paddingVertical: 12,
        borderRadius: 5,
        width: '100%',
    },
    buttonTitle: {
        color: 'white',
        textAlign: 'center',
    },
    footerView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
    },
    footerLink: {
        fontSize: 16,
        color: '#e80505',
        marginLeft: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 10,
    },
    usernameText: {
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal:15,
        width:'50%'
      },
      checkbox: {
        alignSelf: 'center',
        
      },
      checkboxLabel: {
        margin: 8,
      },
});
