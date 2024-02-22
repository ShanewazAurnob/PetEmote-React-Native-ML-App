import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import ViewPosts from './screens/ViewPosts';
import AppNavigator from './screens/AppNavigator';
import AboutUs from './screens/AboutUs';
import LoginScreen from './screens/LogIn';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="AppNav" component={AppNavigator}  options={{headerShown:false}}/>
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="ViewPosts" component={ViewPosts}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
